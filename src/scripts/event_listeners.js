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

import { gameState } from "./functions.js";
import { changeRounds } from "./functions.js";
import { roundManager } from "./functions.js";
import { writeRounds } from "./functions.js";
import { checkClikedKey } from "./functions.js";
import { clickHandler } from "./functions.js";
import { keyboardsWrapper } from "./functions.js";





levelContainer.addEventListener("click", (e) => {
  if (e.target.innerText === "easy") {
    createKeyboard('easy');

  }
  if (e.target.innerText === "medium") {
    createKeyboard('medium');
  }
  if (e.target.innerText === "hard") {
    createKeyboard("hard");
  }
});


button.addEventListener("click", (e) => { // При нажатии на кнопку вызывается функция startHighlighting(2) для подсветки двух случайных элементов на странице.
  startHighlighting(2);
  setTimeout(() => { //После задержки в 3 секунды (3000ms) добавляет обработчик событий на keydown.
    
    document.addEventListener('keydown', keydownHandler);
    console.log('Keydown event listener added after delay');
    keyboardsWrapper.addEventListener('click', clickHandler);
    console.log('Click event listener added after delay');
  }, 3000);
   // 3000ms = 3 seconds
});
repeatGameBtn.addEventListener("click", (e) => {
  
  repeatHighlighted()
  setTimeout(() => { //После задержки в 3 секунды (3000ms) добавляет обработчик событий на keydown.

    document.addEventListener('keydown', keydownHandler);
    console.log('Keydown event listener added after delay');
  }, 3000);
});
newGameBtn.addEventListener("click", (e) => {
  refreshPage();
  roundManager.clear()
  writeRounds()
});

nextBtn.addEventListener ("click", (e) => {
  refreshPage();
  let numberRound = changeRounds();
  writeRounds()
  startHighlighting(2 * numberRound);
  setTimeout(() => { //После задержки в 3 секунды (3000ms) добавляет обработчик событий на keydown.
    
    document.addEventListener('keydown', keydownHandler);
    console.log('Keydown event listener added after delay');
  }, 3000);
})

