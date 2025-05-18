import { levelContainer } from "../generate_elements/generate_elements.js";
import { createKeyboard } from "../keyboard.js";
import { keyboardWrapper } from "../generate_elements/generate_elements.js"
import { button } from "../generate_elements/generate_elements.js";
import { roundNumber } from "../generate_elements/generate_elements.js";
import { letters } from "../keyboard.js"
import { digits } from "../keyboard.js"
import { buttonBox } from "../generate_elements/generate_elements.js";
import { nextBtn } from "../generate_elements/generate_elements.js";
import { repeatGameBtn } from "../generate_elements/generate_elements.js";
import { gameMessage } from "../generate_elements/generate_elements.js";
import { gameMessageWin } from "../generate_elements/generate_elements.js";
const rounds = document.querySelector('.text') // выбор текста с надписью "раунд"
const input = document.querySelector('.input'); // выбор строки ввода для вывода цифр
export const time = 1000; // время для обработчиков событий

const roundCounter = () => { // замыкание,отслеживающее номер раунда
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
  let counter = 0; // изначальное состояние
  return {
    get: () => counter, // Возвращает текущее значение счетчика.
    increment: () => counter++,// Увеличивает счетчик на единицу.
    clear: () => { counter = 0 },  //Обнуляет счетчик
  };
};
export const roundManager = roundCounter(); // Создает замыкание. Объект в через методы котороого мы получаем доступ счетчиеку раундов
export const counterState = counterManager(); // Создает замыкание. Объект в через методы котороого мы получаем доступ к счетчику
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
    randomDiv.classList.add('highlighted'); // подсвечивает случайно выбранный элемент
    setTimeout(() => {
      randomDiv.classList.remove('highlighted'); // отключает подсветку через определенное время
    }, time / 2);
  }, time)

  return randomDiv;
}
export let highlightedDivs = []; // Массив, предназначенный для хранения всех подсвеченных элементов.
export const startHighlighting = (maxCount, callback) => { // Функция запускает процесс подсвечивания элементов, ограниченный количеством maxCount. Вторым параметром передается колбэк функция.

  let count = 0;
  const intervalId = setInterval(() => { //Используется setInterval для выполнения действий с интервалом в 1000 мс (1 секунда).
    let selectedDiv = highlightRandomElement()
    highlightedDivs.push(selectedDiv);
    count++

    if (count === maxCount) {
      clearInterval(intervalId); //Если счетчик достигает значения maxCount, интервал останавливается с помощью clearInterval
      let result = [];
      highlightedDivs.forEach((div) => {
        result.push(div.innerText)
        console.log(result)
        if (callback) callback() // если функция передана , то она выполяется
      });

    }
  }, time);

};

export const repeatHighlighted = () => {
  gameMessage.classList.add('visually-hidden'); //скрывает сообщение перед выполнением функции
  // Функция повторяет выделенные элементы 
  input.value = " ";
  gameState.stop(); // обновляет состояние игры
  counterState.clear() // обновляет счетчик
  highlightedDivs.forEach((div, index) => { // проходит по массиву highlightedDivs, где div — это каждый элемент, а index — его позиция в массиве
    setTimeout(() => { // Первый элемент подсвечивается сразу, второй — через time, третий — через 2 * time и т. д.
      div.classList.add('highlighted');
      setTimeout(() => { //  Вложенный setTimeout Добавляет highlighted через первую задержку.
        div.classList.remove('highlighted');
      }, time / 2); // Время удаления подсветки равно половине `time`, чтобы создать эффект мигания.
    }, index * time)
  })

}

export const refreshPage = () => { // функция обнуляет счетчики и классы у неоторых объектов
  gameMessageWin.classList.add('visually-hidden'); // делает нивидимым сообщение
  gameMessage.classList.add('visually-hidden');
  levelContainer.classList.remove('disabled'); // делает видимым выбор уровня
  button.classList.remove('hidden'); // делает видимым кнопку start
  buttonBox.classList.add('hidden'); // скрывает кнопки управления игрой
  // функция обнуляет состояние игры;
  input.value = ""; // чистит input
  gameState.stop(); // обновляет состояние игры
  counterState.clear() // обновляет счетчик
  document.removeEventListener('keydown', keydownHandler); // убирает обработчик событий

  highlightedDivs = [] // чистит массив с элементами
}

export const newRound = () => { // функция запускающая новый раунд, удаляя классы и очищая ввод
  gameMessageWin.classList.add('visually-hidden');
  gameMessage.classList.add('visually-hidden');
  buttonBox.classList.toggle('disabled');
  input.value = ""; // чистит input
  gameState.stop(); // обновляет состояние игры
  counterState.clear();
  highlightedDivs = [];
  nextBtn.classList.add('hidden');
  repeatGameBtn.classList.remove('hidden')
}

export const checkKeys = (pressedKey) => { //Функция проверяет, соответствует ли нажатая клавиша тексту в подсвеченных элементах:
  let currentDiv = highlightedDivs[counterState.get()] // устанавливает текущий элемент
  if (counterState.get() < highlightedDivs.length) { // проверяет условие при котором счетчик меньше длины массива с элементами
    if (pressedKey.toLowerCase() === currentDiv.innerText.toLowerCase()) { // условие проверяет нажатую кнопку 
      currentDiv.classList.add('highlighted');
      setTimeout(() => {
        currentDiv.classList.remove('highlighted');
      }, time / 2);
      counterState.increment(); // увеличивает счетчик состояния
      input.value += pressedKey.toUpperCase();
      if (counterState.get() === highlightedDivs.length) {
        gameMessageWin.classList.remove('visually-hidden');
        nextBtn.classList.remove('hidden');
        repeatGameBtn.classList.add('hidden')
        return gameState.start()
      }
    }

    else {
      input.value += pressedKey.toUpperCase(); // запись значения кнопки в input 
      let keys = [...document.querySelectorAll('.keyboard__key')]; //Получает массив всех элементов клавиш, используя spread-оператор [...NodeList], 
      // чтобы преобразовать NodeList в обычный массив.
      let key = keys.find(k => k.innerText.toLowerCase() === pressedKey.toLowerCase()) // Использует метод find(), чтобы найти первую клавишу, текст которой совпадает с нажатой буквой. 
      // Сравнение производится в нижнем регистре, чтобы избежать проблем с разным написанием.
      if (key) {
        key.classList.add('highlighted--error');
        gameMessage.classList.remove('visually-hidden');
        setTimeout(() => {
          key.classList.remove('highlighted--error');
        }, time / 2)
          ;
      } else {
        console.warn(`Key "${pressedKey}" not found on the keyboard.`);
      }
      return gameState.start() // меняет состояние игры
    }
  }
  else {
    return gameState.start()
  }

}

export const checkClikedKey = (clickedKey) => { // фунция проверки нажатой кнопки мыши
  let currentDiv = highlightedDivs[counterState.get()]; // текущий элемент устанавливаем в зависимости от индекса
  if (counterState.get() < highlightedDivs.length) {
    if (clickedKey.innerText === currentDiv.innerText) {
      clickedKey.classList.add('highlighted');
      setTimeout(() => {
        clickedKey.classList.remove('highlighted');
      }, time / 2);
      counterState.increment(); // увеличивает счетчик состояния
      input.value += clickedKey.innerText;
      if (counterState.get() === highlightedDivs.length) {
        gameMessageWin.classList.remove('visually-hidden');
        nextBtn.classList.remove('hidden')
        repeatGameBtn.classList.add('hidden');
        return gameState.start()
      }
    }
    else {
      input.value += clickedKey.innerText;
      gameMessage.classList.remove('visually-hidden');
      clickedKey.classList.add('highlighted--error');
      setTimeout(() => {
        clickedKey.classList.remove('highlighted--error');
      }, time / 2);
      return gameState.start()
    }
  }
}
export const keydownHandler = (event) => { // Отслеживает нажатие клавиш, используя event.key.
  let pressedKey = event.key;
  const isAlphanumeric = /^[a-zA-Z0-9]$/; // Проверяет, является ли нажатая клавиша буквенно-цифровой (включая кириллические символы) через регулярное выражение isAlphanumeric.
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
export const clickHandler = (event) => { // Отслеживает нажатие клавиш, используя event.key.
  // используем метод 'closest' для поиска ближайшего родителя с классом 'keyboard__key'
  if (!gameState.getState()) {
    let clickedKey = event.target.closest('.keyboard__key');
    checkClikedKey(clickedKey);
  }
};


export const changeRounds = () => { // Функия увеличивает раунды
  if (roundManager.getRound() < roundManager.getroundsNum()) {
    roundManager.increment();
    return roundManager.getRound();

  }
  roundManager.clear()
  return roundManager.getRound();
}

export const writeRounds = () => { // функция записывает номер текузего раунда
  rounds.innerText = `${roundManager.getRound()} / ${roundManager.getroundsNum()} round`
}

