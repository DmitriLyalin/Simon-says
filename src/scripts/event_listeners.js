import { levelContainer } from "./generate_elements.js";
import { createKeyboard } from "./keyboard.js";
import { button } from "./generate_elements.js";
import { startHighlighting } from "./functions.js";
import { highlightedDivs } from "./functions.js";
import { checkKeys } from "./functions.js";
import { counterManager } from "./functions.js";
import { counterState } from "./functions.js";




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

// button.addEventListener("click", (e) => {
//   startHighlighting(2)
//   console.log('All selected divs:', highlightedDivs);
//   setTimeout(() => {
//     document.addEventListener('keydown', (event) => {
//       const pressedKey = event.key;

//       const isAlphanumeric = /^[a-zA-Z0-9\u0400-\u04FF\u0500-\u052F]$/;
//       if (isAlphanumeric.test(event.key)) {
//         checkKeys(pressedKey);
//       }
//     });
//     console.log('Keydown event listener added after delay');
//   }, 3000); // 3000ms = 3 seconds
// })

button.addEventListener("click", (e) => { // При нажатии на кнопку вызывается функция startHighlighting(2) для подсветки двух случайных элементов на странице.
  startHighlighting(2);
  console.log('All selected divs:', highlightedDivs);

  setTimeout(() => { //После задержки в 3 секунды (3000ms) добавляет обработчик событий на keydown.
    const keydownHandler = (event) => { // Отслеживает нажатие клавиш, используя event.key.
      const pressedKey = event.key;

      const isAlphanumeric = /^[a-zA-Z0-9\u0400-\u04FF\u0500-\u052F]$/; // Проверяет, является ли нажатая клавиша буквенно-цифровой (включая кириллические символы) через регулярное выражение isAlphanumeric.
      if (isAlphanumeric.test(event.key)) {
        // Если checkKeys возвращает false (например, достигнут конец подсветки или найдено совпадение), удаляет обработчик событий keydown, чтобы остановить дальнейшее выполнение.
        const result = checkKeys(pressedKey);
        if (!result) {
          console.log("Condition met, removing keydown listener.");
          document.removeEventListener('keydown', keydownHandler);
        }
      }
    };

    document.addEventListener('keydown', keydownHandler);
    console.log('Keydown event listener added after delay');
  }, 3000); // 3000ms = 3 seconds
});
