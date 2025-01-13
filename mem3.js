const cards = [
    '🍎', '🍎', '🍌', '🍌', 
    '🍇', '🍇', '🍉', '🍉', 
    '🍒', '🍒', '🥝', '🥝', 
    '🍍', '🍍', '🍓', '🍓'
];

// Shuffle the cards
cards.sort(() => 0.5 - Math.random());

const gameBoard = document.getElementById('game-board');
const startScreen = document.getElementById('start-screen');
const startButton = document.getElementById('start-button');
let flippedCards = [];
let matchedCards = [];

// Show the game board when the start button is clicked
startButton.addEventListener('click', () => {
    startScreen.style.display = 'none';
    gameBoard.style.display = 'grid';
    createCards();
});

// Create cards on the game board
function createCards() {
    cards.forEach((card) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.card = card;
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        this.innerHTML = this.dataset.card;
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.card === card2.dataset.card) {
        card1.classList.add('match');
        card2.classList.add('match');
        matchedCards.push(card1, card2);
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card1.innerHTML = '';
            card2.classList.remove('flipped');
            card2.innerHTML = '';
        }, 1000);
    }
    flippedCards = [];

    if (matchedCards.length === cards.length) {
        setTimeout(() => alert('🎉 You won!'), 500);
    }
}
