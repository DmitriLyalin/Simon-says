import { levelContainer } from "./generate_elements.js";
import { createKeyboard } from "./keyboard.js";
import { keyboardWrapper } from "./generate_elements.js"
import { button } from "./generate_elements.js";
import { letters } from "./keyboard.js"
import { digits } from "./keyboard.js"
const getRandomElement = (arr) => {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};

const highlightRandomElement = () => {
  let randomNumber = getRandomElement(digits);
  const divs = Array.from(document.querySelectorAll('.keyboard__key'));
  divs.forEach((div) => {
    if (div.innerText === randomNumber.toString()) {
      console.log(`This number is ${randomNumber}`);
      div.style.color = "green"
    }
  })


}

console.log(highlightRandomElement())