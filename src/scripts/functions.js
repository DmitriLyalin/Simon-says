import { levelContainer } from "./generate_elements.js";
import { createKeyboard } from "./keyboard.js";
import { keyboardWrapper } from "./generate_elements.js"
import { button } from "./generate_elements.js";
import { letters } from "./keyboard.js"
import { digits } from "./keyboard.js"

const input = document.querySelector('.input'); // выбор строки ввода для вывода цифр
export const createGameStateManager = () => { // замыкание отслеживающее состояние игры, выкл и вкл
  let isActive = false;
  return {
    start: () => { isActive = true; },
    stop: () => { isActive = false; },
    getState: () => isActive,
  };
};
export const counterManager = () => { //Функция управляет состоянием счетчика и возвращает объект с методами:
  let counter = 0; // Private state
  return {
    get: () => counter, // Возвращает текущее значение счетчика.
    increment: () => counter++,
    clear: () => { counter = 0 }, // Увеличивает счетчик на единицу.
  };
};

export const counterState = counterManager(); // Создает замыкание. Объяект в через методы котороого мы получаем доступ к счетчику
export const gameState = createGameStateManager(); // замыкание

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
export let highlightedDivs = []; // Массив, предназначенный для хранения всех подсвеченных элементов.
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
export const repeatHighlighted = () => { // Функция повторяет выделенные элементы 
  input.value = " "
  highlightedDivs.forEach((div) => {
    div.style.color = "green";
  })
}

export const refreshPage = () => { // функция обнуляет состояние игры
  input.value = ""; // чистит input
  gameState.stop(); // обновляет состояние игры
  counterState.clear() // обновляет счетчик
  document.removeEventListener('keydown', keydownHandler); // убирает обработчик событий
  highlightedDivs.forEach((div) => { // все переклашенные элементы возвращается в черный цвет
    div.style.color = "black";
  })
  highlightedDivs = []; // чистим массив с элементами
}



export const checkKeys = (pressedKey) => { //Функция проверяет, соответствует ли нажатая клавиша тексту в подсвеченных элементах:
 let currentDiv = highlightedDivs[counterState.get()] // устанавливает текущий элемент
  if (counterState.get() < highlightedDivs.length) { // проверяет условие при котором счетчик меньше длины массива с элементами
    if (pressedKey.toLowerCase() === currentDiv.innerText.toLowerCase()) { // условие проверяет нажатую кнопку 

      console.log(`Correct! You pressed: ${pressedKey}`)
      counterState.increment(); // увеличивает счетчик состояния
      console.log(`increment ${counterState.get()}`)
      input.value += pressedKey; // запись значения кнопки в input 
    }

    else {
      input.value += pressedKey;
      console.log(`Wrong key. You pressed: ${pressedKey}`);
      return gameState.start() // меняет состояние игры
    }
  }
}


export const keydownHandler = (event) => { // Отслеживает нажатие клавиш, используя event.key.
  let pressedKey = event.key;

  const isAlphanumeric = /^[a-zA-Z0-9\u0400-\u04FF\u0500-\u052F]$/; // Проверяет, является ли нажатая клавиша буквенно-цифровой (включая кириллические символы) через регулярное выражение isAlphanumeric.
  if (isAlphanumeric.test(pressedKey)) {
    // Если checkKeys возвращает false (например, достигнут конец подсветки или найдено совпадение), удаляет обработчик событий keydown, чтобы остановить дальнейшее выполнение.
    if (!gameState.getState()) {
      checkKeys(pressedKey);
    }
    else { return gameState.getState() }
  }
};




