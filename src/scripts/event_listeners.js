import { levelContainer } from "./generate_elements.js";
import { createKeyboard } from "./keyboard.js";
import { button } from "./generate_elements.js";


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

button.addEventListener("click", (e) => {

})
