const images = [
  'dragonfruit.png', 
  'durian.png',
  'hamster.png', 
  'mango.png', 
  'octopus.png', 
  'orange.png', 
  'passionfruit.png', 
  'penguin.png', 
  'pig.png', 
  'puppy.png',
];

const levels = [5, 60, 120, 120, 120, 180, 180, 180, 180];

const selectors = {
  moves: document.querySelector('.moves'),
  timer: document.querySelector('.timer'),
  curScore: document.querySelector('.score'),
  start: document.querySelector('.startBtn'),
  next: document.querySelector('.nextBtn'),
  board: document.getElementById('board'),
  scoreForm: document.querySelector('.scoreForm'),
  totalScore: document.querySelector('.totalScore'),
  name: document.querySelector('[name="userName"]'),
  score: document.querySelector('[name="score"]'),
  leaderboard: document.querySelector('.leader_table')
}

var cards = document.querySelectorAll('.cards')

const state = {
  gameStarted: false,
  flippedCards: 0,
  totalFlips: 0,
  totalTime: 0,
  loop: null,
  curLevel: 1,
  curTotalNumCards: 0,
  curNumMatches: 0,
  curScore: 0,
}

const startGame = () => {
  // state.gameStarted = true
  // selectors.start.classList.add('disabled')

  // state.loop = setInterval(() => {
  //     state.totalTime++

  //     selectors.moves.innerText = `${state.totalFlips} moves`
  //     selectors.timer.innerText = `time: ${state.totalTime} sec`
  // }, 1000)
  selectors.start.classList.add('disabled');
  selectors.next.classList.add('disabled');

  state.loop = setInterval(timeTick, 1000);

  initGame();
}

function timeTick() {
  state.totalTime--;
  selectors.timer.innerText = `Time: ${state.totalTime} sec`;

  if (state.totalTime <= 0) {
    clearInterval(state.loop);
    Gameover();
  }
}

let flippedCard = false;
let freezeCard = false;
let firstCard, secondCard;

function initGame() {
  state.gameStarted = true;
  state.flippedCards = 0;
  state.totalFlips = 0;
  state.totalTime = levels[state.curLevel - 1];
  state.curTotalNumCards = 0;
  state.curNumMatches = 0;

  resetBoard();

  state.curTotalNumCards = state.curLevel * 2 + 2;
  var cardsHtml = "";
  for (let i = 0; i < state.curTotalNumCards; i++) {
    cardsHtml += `<div class="cards" data-framework="card${(Math.floor(i / 2))}">
    <img class="front-face" src="img/${images[Math.floor(i / 2)]}" alt="card ${(Math.floor(i / 2))}" />
    <img class="back-face" src="img/cardback.png" alt="Card Back" />
    </div>
    `
    ;
  }

  selectors.board.innerHTML = cardsHtml;
  cards = document.querySelectorAll('.cards');

  shuffle();
  addListener();
}

// const cards = document.querySelectorAll('.cards');

// let flippedCard = false;
// let freezeCard = false;
// let firstCard, secondCard;

function flipCard() {
  if (freezeCard) return;
  if (this === firstCard) return;

  state.totalFlips++;
  selectors.moves.innerText = `Moves: ${state.totalFlips}`

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
  // isMatch ? disableCards() : unflipCards();
  if (isMatch) {
    disableCards();
    state.curNumMatches++;
  } else {
    unflipCards();
  }

  if (state.curNumMatches * 2 == state.curTotalNumCards) {
    goToNextLevel();
  }
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

// (function shuffle() {
//   cards.forEach(card => {
//     let randomPos = Math.floor(Math.random() * 12);
//     card.style.order = randomPos;
//   });
// })();

function shuffle() {
  var pos = [];
  for (let i = 0; i < state.curTotalNumCards; i++) {
    pos.push(i + 1);
  }
  for (let i = pos.length - 1; i > 0; i--) {
    let randIndex = Math.floor(Math.random() * (i+1));

    [pos[i], pos[randIndex]] = [pos[randIndex], pos[i]];
  }

  var index = 0;
  cards.forEach(card => {
    card.style.order = pos[index++];
  });
}

function addListener() {
  cards.forEach(card => card.addEventListener('click', flipCard));
}

function goToNextLevel() {
  clearInterval(state.loop);
  state.curScore += state.curLevel * state.totalTime;
  state.curLevel++;
  selectors.curScore.innerText = `Score: ${state.curScore}`;
  selectors.next.classList.remove('disabled');
}

function Gameover() {
  selectors.start.classList.add('disabled');
  selectors.next.classList.add('disabled');

  selectors.totalScore.style.display = 'block';
  selectors.totalScore.innerText = `Total Score: ${state.curScore}`;

  selectors.scoreForm.style.display = 'block';
  selectors.score.value = state.curScore;

  resetBoard();

  state.gameStarted = false;
  state.flippedCards = 0;
  state.totalFlips  = 0;
  state.totalTime = 0;
  state.loop = null;
  state.curLevel = 1;
  state.curTotalNumCards = 0;
  state.curNumMatches = 0;
  state.curScore = 0;

  // window.location.href = "http://localhost:3000/leaderboard/"
}

function loadLeaderboard() {
  console.log(scores);
  // let curHtml = `<tr>
  //     <th>Rank</th>
  //     <th>User</th>
  //     <th>Score</th>
  //   </tr>`;

  // db.each("SELECT * FROM scores ORDER BY score DESC", (err, row) => {
  //   curHtml += `<tr>
  //       <td>${i + 1}</td>
  //       <td>${row.name}</td>
  //       <td>${row.score}</td>
  //   </tr>`;
  // });
  // for (let i = 0; i < scores.length; i++) {
  //   curHtml += `<tr>
  //       <td>${i + 1}</td>
  //       <td>${scores[i].name}</td>
  //       <td>${scores[i].score}</td>
  //   </tr>`;
  // }
  // selectors.leaderboard.innerHTML = curHtml;
}




