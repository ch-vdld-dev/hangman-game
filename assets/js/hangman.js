// Array of words available
let wordsArray = ["mother", "father", "sister", "brother", "god-father", "god-mother", "spoon", "fork", "knife", "spoon", "plate", "glass", "table", "chair", "napkin", "garden",
              "forest", "river", "field", "mountain", "television", "radio", "smartphone", "computer", "mouse", "keyboard", "speaker", "cable", "pen", "pencil", "eraser",
              "hard drive", "wallet", "note", "coin", "soap", "water", "beer", "limonade", "still water", "sparkling water", "key", "door", "window", "house", "street",
              "car","truck", "bicycle", "traffic light", "plane", "aeroport", "suitcase", "bridge", "flight", "travel", "foreign", "country", "town", "city", "clothe",
              "pants", "t-shirt", "short", "shirt", "mask"]


// function to pick up a word randomly in the array
function randomWord() {
  answer = wordsArray[Math.floor(Math.random() * wordsArray.length)];
}

// function create an alphabet button
function generateButtons() {
  let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz_-'.split('').map(letter =>
    `
      <button
        class="btn btn-lg btn-primary m-2"
        id='` + letter + `'
        onClick="handleGuess('` + letter + `')"
      >
        ` + letter + `
      </button>
    `).join('');

  document.getElementById('keyboard').innerHTML = buttonsHTML;
}

// function to manage the letter, and disable the letter when pick up
function handleGuess(chosenLetter) {
  guessedLetter.indexOf(chosenLetter) === -1 ? guessedLetter.push(chosenLetter) : null;
  document.getElementById(chosenLetter).setAttribute('disabled', true);

  if (answer.indexOf(chosenLetter) >= 0) {
    guessedWord();
    checkIfGameWon();
  } else if (answer.indexOf(chosenLetter) === -1) {
    mistakes++;
    updateMistakes();
    checkIfGameLost();
    hangmanDraw();
  }
}

// function to draw a hangman
function hangmanDraw() {
  document.getElementById("hangman").classList += " lifes-" + (mistakes);
};

// function to hide the alphabet button and show the win button
function checkIfGameWon() {
  if (wordStatus === answer) {
    document.getElementById('keyboard').style.visibility = 'hidden';
    document.getElementById("you-win").classList = "";
  }
}

// function to hide the alphabet button and show the lost button and show the hidden word
function checkIfGameLost() {
  if (mistakes === maxWrong) {
    document.getElementById('wordSpotlight').innerHTML = 'The answer was: ' + answer;
    document.getElementById('keyboard').style.visibility = "hidden";
    document.getElementById("game-over").classList = "";
  }
}

// function to create _ and replace by them correct letters
function guessedWord() {
  wordStatus = answer.split('').map(letter => (guessedLetter.indexOf(letter) >= 0 ? letter : " _ ")).join('');
  document.getElementById('wordSpotlight').innerHTML = wordStatus;
}

// function update the number of mistakes
function updateMistakes() {
  document.getElementById('mistakes').innerHTML = mistakes;
}

// Main program
// initial paramters
let answer = '';
let maxWrong = 10;
let mistakes = 0;
let guessedLetter = [];
let wordStatus = null;
document.getElementById('maxWrong').innerHTML = maxWrong;

// call functions
randomWord();
generateButtons();
guessedWord();