'use strict';

/* UI elements */
const body = document.querySelector('body');
const message = document.querySelector('.message');
const number = document.querySelector('.number');
const guess = document.querySelector('.guess');
const score = document.querySelector('.score');
const highscore = document.querySelector('.highscore');

const checkButton = document.querySelector('.check');
const playAgainButton = document.querySelector('.again');

/* functions */
const clearGuessedNumber = () => {
  guess.value = '';
};

const decreaseScore = reason => {
  updateState({
    score: state.score - 1,
    message: reason,
    lost: state.score === 1,
  });
};

const getRandomNumber = max => {
  return Math.floor(Math.random() * max) + 1;
};

const getStartingState = (highscore = 0) => {
  return {
    number: getRandomNumber(20),
    message: 'Start guessing ...',
    highscore,
    score: 20,
    won: false,
    lost: false,
  };
};

const updateBackgroundColor = () => {
  let backgroundColor = '#222';
  if (state.won) {
    backgroundColor = '#60b347';
  } else if (state.lost) {
    backgroundColor = 'red';
  }

  body.style.backgroundColor = backgroundColor;
};

const updateHighscore = () => {
  highscore.textContent = state.highscore;
};

const updateScore = () => {
  score.textContent = state.score;
};

const updateMessage = () => {
  message.textContent = state.message;
};

const updateNumberView = () => {
  let viewContent = '?';

  if (state.won || state.lost) {
    viewContent = state.number;
  }

  number.textContent = viewContent;
};

const updateState = updatedState => {
  console.log(updatedState);
  state = { ...state, ...updatedState };
  console.log(state);
};

const rerender = () => {
  updateBackgroundColor();
  updateHighscore();
  updateScore();
  updateMessage();
  updateNumberView();
};

const winGame = () => {
  updateState({
    won: true,
    highscore: Math.max(state.highscore, state.score),
    message: '🥳 Correct Number!',
  });
};

/* Game State */
let state = getStartingState();

/* Event Listeners */
checkButton.addEventListener('click', function checkGuess() {
  if (state.won || state.lost) {
    return;
  }

  const guessedNumber = Number(guess.value);
  if (guessedNumber > state.number) {
    decreaseScore('↗️ Too High!');
  } else if (guessedNumber < state.number) {
    decreaseScore('↘️ Too Low!');
  } else {
    winGame();
  }

  rerender();
});

playAgainButton.addEventListener('click', function checkGuess() {
  state = getStartingState(state.highscore);
  clearGuessedNumber();
  rerender();
});

rerender();
