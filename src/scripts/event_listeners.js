import { levelContainer } from "./generate_elements.js";
import { createKeyboard } from "./keyboard.js";
import { button } from "./generate_elements.js";
import { refreshPage, startHighlighting } from "./functions.js";
import { highlightedDivs } from "./functions.js";
import { checkKeys } from "./functions.js";
import { counterManager } from "./functions.js";
import { counterState } from "./functions.js";
import { keydownHandler } from "./functions.js";
import { repeatHighlighted } from "./functions.js";
import { repeatGameBtn } from "./generate_elements.js";
import { newGameBtn } from "./generate_elements.js";
import { nextBtn } from "./generate_elements.js";
import { buttonBox } from "./generate_elements.js";
import { labelEasy } from "./generate_elements.js";
import { labelMedium } from "./generate_elements.js";
import { labelHard } from "./generate_elements.js";
import { input } from "./generate_elements.js";
import { keyboardWrapper } from "./generate_elements.js";

import { gameState } from "./functions.js";
import { changeRounds } from "./functions.js";
import { roundManager } from "./functions.js";
import { writeRounds } from "./functions.js";
import { checkClikedKey } from "./functions.js";
import { clickHandler } from "./functions.js";






levelContainer.addEventListener("click", (e) => {
  if (e.target.innerText === "easy") {
    createKeyboard('easy');
    labelHard.classList.remove('level-checked')
    labelMedium.classList.remove('level-checked')
    labelEasy.classList.add('level-checked');
  }
  if (e.target.innerText === "medium") {
    createKeyboard('medium');
    labelMedium.classList.add('level-checked');
    labelEasy.classList.remove('level-checked')
    labelHard.classList.remove('level-checked')
  }
  if (e.target.innerText === "hard") {
    createKeyboard("hard");
    labelEasy.classList.remove('level-checked')
    labelMedium.classList.remove('level-checked')
    labelHard.classList.add('level-checked')
  }
});


button.addEventListener("click", (e) => {
  
  keyboardWrapper.classList.toggle('disabled');
  button.classList.add('hidden'); // При нажатии на кнопку вызывается функция startHighlighting(2) для подсветки двух случайных элементов на странице.
  startHighlighting(2);
  levelContainer.classList.add('disabled');
  buttonBox.classList.remove('hidden');
  buttonBox.classList.add('disabled');
  input.classList.toggle  ('hidden');
  setTimeout(() => { //После задержки в 3 секунды (3000ms) добавляет обработчик событий на keydown.

    document.addEventListener('keydown', keydownHandler);
    console.log('Keydown event listener added after delay');
    keyboardWrapper.addEventListener('click', clickHandler);
    console.log('Click event listener added after delay');
    buttonBox.classList.remove('disabled');
  }, 3000);
  // 3000ms = 3 seconds
});
repeatGameBtn.addEventListener("click", (e) => {
  repeatGameBtn.classList.add('disabled');
  
  repeatHighlighted()
  setTimeout(() => { //После задержки в 3 секунды (3000ms) добавляет обработчик событий на keydown.

    document.addEventListener('keydown', keydownHandler);
    console.log('Keydown event listener added after delay');
    keyboardWrapper.addEventListener('click', clickHandler);
    console.log('Click event listener added after delay');
  }, 3000);
});
newGameBtn.addEventListener("click", (e) => {
  keyboardWrapper.classList.toggle('disabled');
  input.classList.toggle  ('hidden');
  refreshPage();
  repeatGameBtn.classList.remove('disabled');
  roundManager.clear()
  writeRounds()
});

nextBtn.addEventListener("click", (e) => {
  refreshPage();
  let numberRound = changeRounds();
  writeRounds()
  startHighlighting(2 * numberRound);
  setTimeout(() => { //После задержки в 3 секунды (3000ms) добавляет обработчик событий на keydown.

    document.addEventListener('keydown', keydownHandler);
    console.log('Keydown event listener added after delay');
  }, 3000);
})

