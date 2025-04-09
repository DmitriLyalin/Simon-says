import { createElement } from "./create_elements.js"

//header

const header = createElement({ tag: 'header', parent: document.body, classes: ['header'] });
const container = createElement({ parent: header, classes: ['container'] });
const headerTitleWrapper = createElement({ parent: container, classes: ['header__title-wrapper'] });
const headerTitle = createElement({ tag: 'h1', text: 'Simon Says Game', parent: headerTitleWrapper, classes: ['header__title'] });

//main
const main = createElement({ tag: 'main', parent: document.body, classes: ['main'] });
const mainContainer = createElement({ parent: main, classes: ['container'] });
const button = createElement({ tag: 'button', text: 'Start', parent: mainContainer, classes: ['main__btn', 'button'] });
const levelContainer = createElement({ parent: mainContainer, classes: ['level-container'] });

// Levels of difficulty
const labelEasy = createElement({ tag: 'label', text: 'easy', parent: levelContainer, attributes: { for: 'easy' } })
const easyLevelBtn = createElement({ tag: 'input', parent: levelContainer, attributes: { type: 'radio', id: 'easy', value: 'easy', name: 'level' } });
easyLevelBtn.setAttribute('checked', '');
const labelMedium = createElement({ tag: 'label', text: 'medium', parent: levelContainer, attributes: { for: 'medium' } })
const mediumLevelBtn = createElement({ tag: 'input', parent: levelContainer, attributes: { type: 'radio', id: 'medium', value: 'medium', name: 'level' } });
const labelHard = createElement({ tag: 'label', text: 'hard', parent: levelContainer, attributes: { for: 'hard' } })
const hardLevelBtn = createElement({ tag: 'input', parent: levelContainer, attributes: { type: 'radio', id: 'hard', value: 'hard', name: 'level' } });

//Keyboard warpper
export const keyboardWrapper = createElement({ parent: mainContainer, classes: ['keyboard-wrapper'] })

//input
const input = createElement({ tag: 'input', parent: mainContainer, classes: ['input'] });
input.setAttribute('readonly', '');
const buttonBox = createElement({ parent: mainContainer, classe: ['button-wrapper'] });
const newGameBtn = createElement({ tag: 'button', text: 'New Game', parent: buttonBox, classes: ['button'] });
const repeatGameBtn = createElement({ tag: 'button', text: 'Repeat Sequence', parent: buttonBox, classes: ['button'] });
const nextBtn = createElement({ tag: 'button', text: 'Next Round', parent: buttonBox, classes: ['button'] });
const roundNumber = createElement({ tag: 'p', text: '1/5 round', parent: buttonBox, classes: ['text'] })