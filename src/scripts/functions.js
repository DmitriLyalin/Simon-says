import { levelContainer } from "./generate_elements.js";
import { createKeyboard } from "./keyboard.js";
import { keyboardWrapper } from "./generate_elements.js"
import { button } from "./generate_elements.js";
import { letters } from "./keyboard.js"
import { digits } from "./keyboard.js"

 // Эта функция принимает массив (arr) и возвращает случайный элемент из него.
const getRandomElement = (arr) => {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};
 // Подсвечивает случайный элемент на странице.
export const highlightRandomElement = () => {
  const divs = Array.from(document.querySelectorAll('.keyboard__key')); // Преобразует их в массив (Array.from) для работы с функцией getRandomElement.
  let randomDiv = getRandomElement(divs);
  randomDiv.style.color = "red";
  return randomDiv;
}
export const highlightedDivs = []; // Массив, предназначенный для хранения всех подсвеченных элементов.
export const startHighlighting = (maxCount) => { // Функция запускает процесс подсвечивания элементов, ограниченный количеством maxCount.

  let count = 0;
  const intervalId = setInterval(() => { //Используется setInterval для выполнения действий с интервалом в 1000 мс (1 секунда).
    let selectedDiv = highlightRandomElement()
    highlightedDivs.push(selectedDiv);
    count++
    if (count === maxCount) {
      clearInterval(intervalId); //Если счетчик достигает значения maxCount, интервал останавливается с помощью clearInterval

    }
  }, 1000);
};

export const counterManager = () => { //Функция управляет состоянием счетчика и возвращает объект с методами:
  let counter = 0; // Private state
  return {
    get: () => counter, // Возвращает текущее значение счетчика.
    increment: () => counter++, // Увеличивает счетчик на единицу.
  };
};
export const counterState = counterManager(); // Создает замыкание. Объяект в через методы котороого мы получаем доступ к счетчику

export const checkKeys = (pressedKey) => { //Функция проверяет, соответствует ли нажатая клавиша тексту в подсвеченных элементах:
  const input = document.querySelector('.input');
  let isCorrect = false; // Состояние отслеживает правильно ли все нажато

  for (let i = counterState.get(); i < highlightedDivs.length; i++) {
    if (pressedKey.toLowerCase() === highlightedDivs[i].innerText.toLowerCase()) {
      console.log(`Correct! You pressed: ${pressedKey}`)
      counterState.increment();

      input.value += pressedKey;

      return isCorrect = true;

    }
    else {
      input.value += pressedKey; 
      console.log(`Wrong key. You pressed: ${pressedKey}`);
      return isCorrect = false;

    }
  }

};



