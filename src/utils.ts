export function isObject (value: object) {
  return Object.prototype.toString.call(value) === '[object Object]'
}

export function isEmptyObject (value: object) {
  return !(isObject(value) && Object.keys(value).length > 0);
}

export function el (tag: string, attributes:{[key:string]: string}, ...children: (HTMLElement | string)[]) {
  const element = document.createElement(tag)

  if (!isEmptyObject(attributes)) {
    Object.entries(attributes).forEach(([attrName, attrValue]) => {
      if (attrName === 'className') {
        element.classList.add(attrValue)
      } else {
        element.setAttribute(attrName, attrValue)
      }
    })
  }

  for (const child of children) {
    if (typeof child === 'string') {
      element.insertAdjacentText('beforeend', child)
    } else if (child instanceof HTMLElement) {
      element.insertAdjacentElement('beforeend', child)
    }
  }

  return element
}
