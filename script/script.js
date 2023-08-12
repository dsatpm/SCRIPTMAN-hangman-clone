// Selecting DOM elements
const gameTimerEl = document.getElementById('gameTimer');
const wordDisplayEl = document.getElementById('spaces');
const gameState = document.getElementById('buttonAnimate');
const timeEl = document.getElementById('cdTimer');

// Game variables
let gameIsRunning = false;
let untilStart;
let sixtySeconds = 60;
const possibleWordList = [
  'javascript', 'programming', 'queryselector', 'element', 'getelementbyid',
  'array', 'iterating', 'object', 'method', 'function', 'loop', 'setinterval',
  'document', 'innerhtml', 'addeventlistener', 'textcontent', 'string',
  'integer', 'boolean', 'dom', 'setid', 'getid', 'localstorage', 'click',
  'keydown', 'event'
];
let possibleWord;
let wrongGuess = 0;
const maximumGuess = 5;
let score = 0;

// Intervals
let startClockInterval;
let startGameInterval;

// Function to start the game
function gameStart() {
  clearInterval(startGameInterval);
  startGameInterval = setInterval(function () {
    untilStart--;

    if (untilStart > 0) {
      timeEl.textContent = untilStart;
      timeEl.style.opacity = 1;
      setTimeout(function () {
        timeEl.style.opacity = 0;
      }, 500);
    } else {
      timeEl.textContent = '';
      clearInterval(startGameInterval);

      wordPicker();
      gameTimer();
    }
  }, 1000);
}

// Function to pick a random word
function wordPicker() {
  possibleWord = possibleWordList[Math.floor(Math.random() * possibleWordList.length)];
  const underScore = '_ '.repeat(possibleWord.length);
  wordDisplayEl.textContent = underScore;
}

// Function to handle game timer
function gameTimer() {
  clearInterval(startClockInterval);
  startClockInterval = setInterval(function () {
    sixtySeconds--;

    if (sixtySeconds >= 0) {
      gameTimerEl.textContent = sixtySeconds;

    if (sixtySeconds <= 10) {
      gameTimerEl.style.color = 'orangered';
      gameTimerEl.style.fontSize = '8rem';
      gameTimerEl.style.width = '550px';
      gameTimerEl.textContent += ' - HURRY UP!';
    } else {
      gameTimerEl.style.color = 'whitesmoke';
    } 
  } else {
    gameTimerEl.textContent = '';
    clearInterval(startClockInterval);

    score--;
    endGame();

    wordDisplayEl.innerHTML = `YOU SUCK LOSER.<br>Score: ${score}`;
  }
  }, 1000);
}

function endGame() {
  clearInterval(startGameInterval);
  clearInterval(startClockInterval);
  gameIsRunning = false;
  gameState.classList.remove('flip');
  wordDisplayEl.textContent = '';
}

// Function to update the word display
function updateDisplay() {
  wordDisplayEl.textContent = wordDisplay.join(' ');
}

// Event listener for game state button
gameState.addEventListener('click', function () {
  if (gameIsRunning) {
    endGame();
    wordDisplayEl.textContent = 'GAME OVER!';
  } else {
    endGame();
    untilStart = 4;
    sixtySeconds = 60;
    gameStart();
    gameIsRunning = true;
  }

  gameState.classList.toggle('flip');
});

// Event listener for keyboard input
document.addEventListener('keydown', function (event) {
  if (gameIsRunning) {
    const key = event.key.toLowerCase();
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';

    if (alphabet.includes(key)) {
      if (possibleWord.includes(key)) {
        wordDisplay = wordDisplayEl.textContent.split(' ');

        possibleWord.split('').forEach((letter, i) => {
          if (letter === key) {
            wordDisplay[i] = key;
          }
        });

        updateDisplay();

        if (wordDisplay.join('') === possibleWord) {
          score++;
          endGame();
          wordDisplayEl.innerHTML = `HELL YEAH, BROTHER! YOU GUESSED ${possibleWord}! <br>Score: ${score}`;
        }
        
      }
    }
  }
});
