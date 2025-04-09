import { createElement } from "./create_elements.js";
import { keyboardWrapper } from "./generate_elements.js"

const keyboard = (type) => {
  const letters = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P",
    "A", "S", "D", "F", "G", "H", "J", "K", "L",
    "Z", "X", "C", "V", "B", "N", "M"];
  const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  let keyboard = createElement({ parent: keyboardWrapper, clearParent: true, classes: ['keyboard'] });
  if (type === 'easy' || type === 'hard') {
    let digitsRow = createElement({ parent: keyboard, classes: ['keyboard__row'] });
    digits.forEach((digit) => {
      createElement({ text: `${digit}`, parent: digitsRow, classes: ['keyboard__key'] })
    })
  }
}
keyboard('easy')