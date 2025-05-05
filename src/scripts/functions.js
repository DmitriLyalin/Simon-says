import { levelContainer } from "./generate_elements.js";
import { createKeyboard } from "./keyboard.js";
import { keyboardWrapper } from "./generate_elements.js"
import { button } from "./generate_elements.js";
import { roundNumber } from "./generate_elements.js";
import { letters } from "./keyboard.js"
import { digits } from "./keyboard.js"
import { buttonBox } from "./generate_elements.js";
const rounds = document.querySelector('.text')
const input = document.querySelector('.input'); // выбор строки ввода для вывода цифр
// export const keyboardsWrapper = document.querySelector('.keyboard')
const roundCounter = () => {
  let round = 1;
  let roundsNum = 5;
  return {
    getRound: () => round,
    increment: () => ++round,
    clear: () => { round = 1 },
    getroundsNum: () => roundsNum,
  }
}
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
export const roundManager = roundCounter();
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
  setTimeout(() => {
    randomDiv.classList.add('highlighted');
    setTimeout(() => {
      randomDiv.classList.remove('highlighted');
    }, 500);
  }, 1000)

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
export const repeatHighlighted = () => {
  // Функция повторяет выделенные элементы 
  input.value = " ";
  gameState.stop(); // обновляет состояние игры
  counterState.clear() // обновляет счетчик
  highlightedDivs.forEach((div, index) => {
    setTimeout(() => {
      div.classList.add('highlighted');
      setTimeout(() => {
        div.classList.remove('highlighted');
      }, 500);
    }, index * 1000)
  })
}

export const refreshPage = () => {
  levelContainer.classList.remove('disabled');
  button.classList.remove('hidden');
  buttonBox.classList.add('hidden')
  // функция обнуляет состояние игры;
  input.value = ""; // чистит input
  gameState.stop(); // обновляет состояние игры
  counterState.clear() // обновляет счетчик
  document.removeEventListener('keydown', keydownHandler); // убирает обработчик событий
  // highlightedDivs.forEach((div) => { // все переклашенные элементы возвращается в черный цвет
  //   div.style.color = "black";
  // })
  highlightedDivs = [];
  // чистим массив с элементами
}



export const checkKeys = (pressedKey) => { //Функция проверяет, соответствует ли нажатая клавиша тексту в подсвеченных элементах:
  let currentDiv = highlightedDivs[counterState.get()] // устанавливает текущий элемент
  if (counterState.get() < highlightedDivs.length) { // проверяет условие при котором счетчик меньше длины массива с элементами
    if (pressedKey.toLowerCase() === currentDiv.innerText.toLowerCase()) { // условие проверяет нажатую кнопку 
        currentDiv.classList.add('highlighted');
        setTimeout(() => {
          currentDiv.classList.remove('highlighted');
        }, 300);
  
      console.log(`Correct! You pressed: ${pressedKey}`)

      counterState.increment(); // увеличивает счетчик состояния
      console.log(`increment ${counterState.get()}`)
      input.value += pressedKey; // запись значения кнопки в input 
    }

    else {
      input.value += pressedKey;
      currentDiv.classList.add('highlighted--error');
        setTimeout(() => {
          currentDiv.classList.remove('highlighted--error');
        }, 300);
      console.log(`Wrong key. You pressed: ${pressedKey}`);
      return gameState.start() // меняет состояние игры
    }
  }
  else {
    return gameState.start()
  }
}

export const checkClikedKey = (clickedKey) => {
  let currentDiv = highlightedDivs[counterState.get()];
  if (counterState.get() < highlightedDivs.length) {
    if (clickedKey.innerText === currentDiv.innerText) {

      setTimeout(() => {
        clickedKey.classList.add('highlighted');
        setTimeout(() => {
          clickedKey.classList.remove('highlighted');
        }, 200);
      }, 400)

      console.log(`Correct! You clicked: ${clickedKey.innerText}`)
      counterState.increment(); // увеличивает счетчик состояния
      console.log(`increment ${counterState.get()}`)
      input.value += clickedKey.innerText;
    }
    else {
      input.value += clickedKey.innerText;
      setTimeout(() => {
        clickedKey.classList.add('highlighted--error');
        setTimeout(() => {
          clickedKey.classList.remove('highlighted--error');
        }, 200);
      }, 400)
      console.log(`Wrong key. You pressed: ${clickedKey.innerText}`);
      return gameState.start()
    }
  }
  else {
    console.log('cecle ended')

    return gameState.start()
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
    else {
      return gameState.getState();

    }
  }
};

// Select the parent container of the keyboard


// Add a click event listener to the parent container



//click handler
export const clickHandler = (event) => { // Отслеживает нажатие клавиш, используя event.key.
  // Use the `closest` method to find the nearest element with the class "keyboard__key"
  if (!gameState.getState()) {
    console.log(gameState.getState())
    let clickedKey = event.target.closest('.keyboard__key');
    checkClikedKey(clickedKey);
  }
  else {
    // keyboardsWrapper.removeEventListener('click', clickHandler);
  }
};
// changing rounds

export const changeRounds = () => {

  if (roundManager.getRound() < roundManager.getroundsNum()) {
    roundManager.increment()
    return roundManager.getRound();

  }
  console.log(gameState.getState());
  roundManager.clear()
  return roundManager.getRound();
}

export const writeRounds = () => {
  rounds.innerText = `${roundManager.getRound()} / ${roundManager.getroundsNum()} round`
}

