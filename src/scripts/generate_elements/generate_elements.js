import { createElement } from "../create_elements.js"

//header


const header = createElement({ tag: 'header', parent: document.body, classes: ['header'] });
const container = createElement({ parent: header, classes: ['container'] });
const headerTitleWrapper = createElement({ parent: container, classes: ['header__title-wrapper'] });
const headerTitle = createElement({ tag: 'h1', text: 'Simon Says Game', parent: headerTitleWrapper, classes: ['header__title'] });

//main
const main = createElement({ tag: 'main', parent: document.body, classes: ['main'] });
const mainContainer = createElement({ parent: main, classes: ['container'] });
const textBox = createElement({ parent: mainContainer, classes: ['main__text-box'] });
export const gameMessage = createElement({ tag: 'p', parent: textBox, text: 'Wrong key!', classes: ['main__text', 'text--error', 'visually-hidden'] });
export const gameMessageWin = createElement({ tag: 'p', parent: textBox, text: 'Well done!', classes: ['main__text', 'text--complete', 'visually-hidden'] });
export const button = createElement({ tag: 'button', text: 'Start', parent: mainContainer, classes: ['main__btn', 'button'] });
export const levelContainer = createElement({ parent: mainContainer, classes: ['level-container'] });

// Levels of difficulty
export const labelEasy = createElement({ tag: 'label', text: 'easy', parent: levelContainer, attributes: { for: 'easy' }, classes: ['level-checked', 'level-easy'] })
export const easyLevelBtn = createElement({ tag: 'input', parent: levelContainer, attributes: { type: 'radio', id: 'easy', value: 'easy', name: 'level' }, classes: ['input__radio'] });
easyLevelBtn.setAttribute('checked', '');
export const labelMedium = createElement({ tag: 'label', text: 'medium', parent: levelContainer, attributes: { for: 'medium' }, classes: [ 'level-medium'] })
const mediumLevelBtn = createElement({ tag: 'input', parent: levelContainer, attributes: { type: 'radio', id: 'medium', value: 'medium', name: 'level' }, classes: ['input__radio'] });
export const labelHard = createElement({ tag: 'label', text: 'hard', parent: levelContainer, attributes: { for: 'hard' }, classes: [ 'level-hard'] })
const hardLevelBtn = createElement({ tag: 'input', parent: levelContainer, attributes: { type: 'radio', id: 'hard', value: 'hard', name: 'level' }, classes: ['input__radio'] });

//Keyboard warpper
export const keyboardWrapper = createElement({ parent: mainContainer, classes: ['keyboard-wrapper', 'disabled'] })

//input
export const input = createElement({ tag: 'input', parent: mainContainer, classes: ['input', 'hidden'] });
input.setAttribute('readonly', '');
export const buttonBox = createElement({ parent: mainContainer, classes: ['button-wrapper', 'hidden'] });
export const newGameBtn = createElement({ tag: 'button', text: 'New Game', parent: buttonBox, classes: ['button'] });
export const repeatGameBtn = createElement({ tag: 'button', text: 'Repeat Sequence', parent: buttonBox, classes: ['button'] });
export const nextBtn = createElement({ tag: 'button', text: 'Next Round', parent: buttonBox, classes: ['button', 'hidden'] });
export const roundNumber = createElement({ tag: 'p', text: '1 / 5 round', parent: buttonBox, classes: ['text'] })
