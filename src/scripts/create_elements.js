
export let createElement = (settings) => {
  const { tag = 'div',
    text = '',
    attributes = {},
    classes = [],
    parent,
    clearParent,
  } = settings;
  const element = document.createElement(tag);
  if (text) {
    element.textContent = text;
  }
  if (classes.length > 0) {
    element.classList.add(...classes)
  }
  for (let key in attributes) {
    element.setAttribute(key, attributes[key])
  }

  if (parent && clearParent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild)
    }
  }
  if (parent) {
    parent.append(element);
  }
  return element;
}

const elem1 = createElement({ tag: 'div', text: 'text', classes: ['bottom'], parent: document.body, });
