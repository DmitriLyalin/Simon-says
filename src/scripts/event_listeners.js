
import { createKeyboard } from "./keyboard.js";

import * as Elements from "./generate_elements/index.js"
import * as Functions from "./functions/index.js"

Elements.levelContainer.addEventListener("click", (e) => {
  if (e.target.closest(".level-easy")?.classList.contains("level-easy")) {
    console.log(e.target)
    createKeyboard('easy');
    Elements.labelHard.classList.remove('level-checked')
    Elements.labelMedium.classList.remove('level-checked')
    Elements.labelEasy.classList.add('level-checked');
  }
  if (e.target.closest(".level-medium")?.classList.contains("level-medium")) {
    createKeyboard('medium');
    Elements.labelMedium.classList.add('level-checked');
    Elements.labelEasy.classList.remove('level-checked')
    Elements.labelHard.classList.remove('level-checked')
  }
  if (e.target.closest(".level-hard")?.classList.contains("level-hard")) {
    createKeyboard("hard");
    Elements.labelEasy.classList.remove('level-checked')
    Elements.labelMedium.classList.remove('level-checked')
    Elements.labelHard.classList.add('level-checked')
  }
});


Elements.button.addEventListener("click", (e) => {

  Elements.keyboardWrapper.classList.add('disabled');
  Elements.button.classList.add('hidden'); // При нажатии на кнопку вызывается функция startHighlighting(2) для подсветки двух случайных элементов на странице.
  Functions.startHighlighting(2);
  Elements.levelContainer.classList.add('disabled');
  Elements.buttonBox.classList.remove('hidden');
  Elements.buttonBox.classList.add('disabled');
  Elements.input.classList.toggle('hidden');


  setTimeout(() => { //После задержки в 3 секунды (3000ms) добавляет обработчик событий на keydown.
    Elements.keyboardWrapper.classList.remove('disabled');
    document.addEventListener('keydown', Functions.keydownHandler);
    Elements.keyboardWrapper.addEventListener('click', Functions.clickHandler);
    Elements.buttonBox.classList.remove('disabled');
  }, Functions.time * 4);
  // 3000ms = 3 seconds
});
Elements.repeatGameBtn.addEventListener("click", (e) => {
  Elements.repeatGameBtn.classList.add('disabled');
  Elements.keyboardWrapper.classList.add('disabled');
  Elements.newGameBtn.classList.add('disabled');
  Functions.repeatHighlighted()
  setTimeout(() => { //После задержки в 3 секунды (3000ms) добавляет обработчик событий на keydown.
    Elements.keyboardWrapper.classList.remove('disabled');
    Elements.newGameBtn.classList.remove('disabled');
    document.addEventListener('keydown', Functions.keydownHandler);
    Elements.keyboardWrapper.addEventListener('click', Functions.clickHandler);
  }, Functions.time * Functions.highlightedDivs.length);

});
Elements.newGameBtn.addEventListener("click", (e) => {
  Elements.keyboardWrapper.classList.toggle('disabled');
  Elements.input.classList.toggle('hidden');
  Functions.refreshPage();
  Elements.repeatGameBtn.classList.remove('disabled');
  Elements.repeatGameBtn.classList.remove('hidden');
  Elements.nextBtn.classList.add('hidden');
  Functions.roundManager.clear();
  Functions.writeRounds();
});

Elements.nextBtn.addEventListener("click", () => {
  Elements.keyboardWrapper.classList.add('disabled');
  let numberRound = Functions.changeRounds();
  Functions.newRound()
  Functions.writeRounds();
  Functions.startHighlighting(2 * numberRound, () => {
    setTimeout(() => {
      Elements.keyboardWrapper.classList.remove('disabled');
      Elements.buttonBox.classList.remove('disabled');
      Elements.newGameBtn.classList.remove('disabled');
      Elements.repeatGameBtn.classList.remove('disabled');
      document.removeEventListener('keydown', Functions.keydownHandler);
      document.addEventListener('keydown', Functions.keydownHandler);
    }, Functions.time * 2);
  });
});


