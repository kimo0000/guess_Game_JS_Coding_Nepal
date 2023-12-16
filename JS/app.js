const inputsParent = document.querySelector(".inputs");
const inputs = inputsParent.querySelectorAll("input");
const inputText = document.querySelector(".input_text");
const hintEl = document.querySelector(".hint");
const remainGuess = document.querySelector(".remain_guess");
const wrongLetter = document.querySelector(".wrong_letter");
const btnReset = document.querySelector(".init_game");

let wrd,
  maxguess = 8;
let correct = [],
  incorrect = [];

const randomWord = () => {
  const rondomObj = wordList[Math.floor(Math.random() * wordList.length)];
  const { word, hint } = rondomObj;
  wrd = word;
  console.log(wrd);
  (maxguess = 8), (incorrect = []), (correct = []);
  remainGuess.innerText = maxguess;
  wrongLetter.innerText = incorrect;

  let html = "";
  for (let wordLetter of word) {
    html += `<input type="text" disabled>`;
  }

  hintEl.innerText = hint;

  inputsParent.innerHTML = html;
};

const initGame = (e) => {
  let key = e.target.value;
  //    console.log(key);
  //    console.log(wrd);

  if (
    key.match(/[a-zA-Z]/gi) &&
    !incorrect.includes(key) &&
    !correct.includes(key)
  ) {
    if (wrd.includes(key)) {
      for (let i = 0; i < wrd.length; i++) {
        if (wrd[i] === key) {
          correct.push(key);
          inputsParent.querySelectorAll("input")[i].value = key;
        }
      }
    } else {
      maxguess--;
      incorrect.push(` ${key}`);
      //  console.log(maxguess);
    }
  }

  remainGuess.innerText = maxguess;
  wrongLetter.innerText = incorrect;
  inputText.value = "";

  if (correct.length === wrd.length) {
    //    console.log(correct.length, wrd.length);
    alert("Gongra! You Have Find The Correct Word");
    for (let i = 0; i < wrd.length; i++) {
      inputsParent.querySelectorAll("input")[i].value = wrd[i];
    }
  }
  if (maxguess < 1) {
    alert(`Game Over! The Correct Word Is "${wrd.toUpperCase()}"`);
    randomWord();
  }
};

randomWord();
// console.log(wrd);
document.addEventListener("click", () => inputText.focus());
btnReset.addEventListener("click", randomWord);
inputText.addEventListener("input", initGame);
