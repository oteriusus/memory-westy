const board = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');
const startButton = document.getElementById('start-button');

let chosenCards = [];
let cardsId = [];
let cardsWon = [];
let score = 0;

// Aquí debes poner tus 18 parejas (36 imágenes en total)
const cardArray = [
    { name: '1', img: 'media/image01.jpg' }, { name: '1', img: 'media/image01.jpg' },
    { name: '2', img: 'media/image02.jpg' }, { name: '2', img: 'media/image02.jpg' },
    // ... así hasta completar 18 parejas
];

// Función para barajar
cardArray.sort(() => 0.5 - Math.random());

function createBoard() {
    board.innerHTML = ''; // Limpiar tablero
    cardsWon = [];
    score = 0;
    scoreDisplay.textContent = score;

    console.log("Cargando tablero...");

    cardArray.forEach((item, index) => {
        const card = document.createElement('div');
        card.setAttribute('class', 'card');
        card.setAttribute('data-id', index);
        card.addEventListener('click', flipCard);

        const img = document.createElement('img');
        img.src = item.img;
        img.onerror = () => console.error("No se pudo cargar la imagen:", item.img);
        img.setAttribute('src', item.img);

        card.appendChild(img);
        board.appendChild(card);
    });
}

function flipCard() {
    let cardId = this.getAttribute('data-id');

    // Solo permite voltear si no es la misma y no hay ya 2 volteadas
    if (!cardsId.includes(cardId) && chosenCards.length < 2 && !this.classList.contains('matched')) {
        chosenCards.push(cardArray[cardId].name);
        cardsId.push(cardId);
        this.classList.add('flipped');

        if (chosenCards.length === 2) {
            // Temporizador de 500ms antes de comprobar
            setTimeout(checkForMatch, 500);
        }
    }
}

function checkForMatch() {
    const cards = document.querySelectorAll('.card');
    const optionOneId = cardsId[0];
    const optionTwoId = cardsId[1];

    if (chosenCards[0] === chosenCards[1]) {
        // Coinciden: se mantienen en la posición
        cards[optionOneId].classList.replace('flipped', 'matched');
        cards[optionTwoId].classList.replace('flipped', 'matched');
        cardsWon.push(chosenCards);
        score++;
        scoreDisplay.textContent = score;
    } else {
        // No coinciden: se ocultan
        cards[optionOneId].classList.remove('flipped');
        cards[optionTwoId].classList.remove('flipped');
    }

    chosenCards = [];
    cardsId = [];

    if (cardsWon.length === cardArray.length / 2) {
        alert('¡Felicidades! Has encontrado todas las parejas.');
    }
}

// El juego solo empieza al pulsar el botón
startButton.addEventListener('click', createBoard);