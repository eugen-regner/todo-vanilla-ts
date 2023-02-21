import { ObjectType } from './types'

export function isObject (value: object) {
  return Object.prototype.toString.call(value) === '[object Object]'
}

export function areDeepEqual (object1: ObjectType, object2: ObjectType) {
  const objKeys1 = Object.keys(object1)
  const objKeys2 = Object.keys(object2)

  if (objKeys1.length !== objKeys2.length) return false

  for (const key of objKeys1) {
    const value1 = object1[key]
    const value2 = object2[key]

    const areObjects = isObject(value1) && isObject(value2)

    if ((areObjects && !areDeepEqual(value1, value2)) ||
      (!areObjects && value1 !== value2)
    ) {
      return false
    }
  }
  return true
}

export function isEmptyObject (value: object) {
  return !(isObject(value) && Object.keys(value).length > 0)
}

export function domEl (tag: string, attributes:{[key:string]: string}, ...children: (HTMLElement | string)[]) {
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
