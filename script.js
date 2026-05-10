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
    { name: '3', img: 'media/image03.jpg' }, { name: '3', img: 'media/image03.jpg' },
    { name: '4', img: 'media/image04.jpg' }, { name: '4', img: 'media/image04.jpg' },
    { name: '5', img: 'media/image05.jpg' }, { name: '5', img: 'media/image05.jpg' },
    { name: '6', img: 'media/image06.jpg' }, { name: '6', img: 'media/image06.jpg' },
    { name: '7', img: 'media/image07.jpg' }, { name: '7', img: 'media/image07.jpg' },
    { name: '8', img: 'media/image08.jpg' }, { name: '8', img: 'media/image08.jpg' },
    { name: '9', img: 'media/image09.jpg' }, { name: '9', img: 'media/image09.jpg' },
    { name: '10', img: 'media/image10.jpg' }, { name: '10', img: 'media/image10.jpg' },
    { name: '11', img: 'media/image11.jpg' }, { name: '11', img: 'media/image11.jpg' },
    { name: '12', img: 'media/image12.jpg' }, { name: '12', img: 'media/image12.jpg' },
    { name: '13', img: 'media/image13.jpg' }, { name: '13', img: 'media/image13.jpg' },
    { name: '14', img: 'media/image14.jpg' }, { name: '14', img: 'media/image14.jpg' },
    { name: '15', img: 'media/image15.jpg' }, { name: '15', img: 'media/image15.jpg' },
    { name: '16', img: 'media/image16.jpg' }, { name: '16', img: 'media/image16.jpg' },
    { name: '17', img: 'media/image17.jpg' }, { name: '17', img: 'media/image17.jpg' },
    { name: '18', img: 'media/image18.jpg' }, { name: '18', img: 'media/image18.jpg' },
    { name: '19', img: 'media/image19.jpg' }, { name: '19', img: 'media/image19.jpg' },
    { name: '20', img: 'media/image20.jpg' }, { name: '20', img: 'media/image20.jpg' },
    { name: '21', img: 'media/image21.jpg' }, { name: '21', img: 'media/image21.jpg' },
    { name: '22', img: 'media/image22.jpg' }, { name: '22', img: 'media/image22.jpg' },
    { name: '23', img: 'media/image23.jpg' }, { name: '23', img: 'media/image23.jpg' },
    { name: '24', img: 'media/image24.jpg' }, { name: '24', img: 'media/image24.jpg' },
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
        alert('¡Muy bien! Has encontrado todas las parejas, has ganado una moneda Westy');
    }
}

// El juego solo empieza al pulsar el botón
startButton.addEventListener('click', createBoard);