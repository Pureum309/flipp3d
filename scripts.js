const selectors = {
  moves: document.querySelector('.moves'),
  timer: document.querySelector('.timer'),
  start: document.querySelector('button'),
}

const state = {
  gameStarted: false,
  flippedCards: 0,
  totalFlips: 0,
  totalTime: 0,
  loop: null
}

const startGame = () => {
  state.gameStarted = true
  selectors.start.classList.add('disabled')

  state.loop = setInterval(() => {
      state.totalTime++

      selectors.moves.innerText = `${state.totalFlips} moves`
      selectors.timer.innerText = `time: ${state.totalTime} sec`
  }, 1000)
}

const cards = document.querySelectorAll('.cards');

let flippedCard = false;
let freezeCard = false;
let firstCard, secondCard;

function flipCard() {
  if (freezeCard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!flippedCard) {
    flippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  freezeCard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [flippedCard, freezeCard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));




