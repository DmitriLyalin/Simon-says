import { createElement } from "./create_elements.js";
import { keyboardWrapper } from "./generate_elements.js"

export const keyboard = (type) => {
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
  if (type === 'medium' || type === 'hard') {
    const createKeyboardCustom = (letters) => {
      const rowsConfig = [10, 9, 7];
      const keyboard = createElement({ parent: keyboardWrapper, clearParent: true, classes: ['keyboard'] });
      let startIndex = 0;
      rowsConfig.forEach((rowSize) => {
        let lettersRow = createElement({ parent: keyboard, classes: ['keyboard__row'] });
        for (let i = startIndex; i < startIndex + rowSize; i++) {
          createElement({ parent: lettersRow, text: `${letters[i]}`, classes: ['keyboard__key'] });
        }
        startIndex += rowSize;
      })
      return keyboard
    }
    createKeyboardCustom(letters);

  }
}


