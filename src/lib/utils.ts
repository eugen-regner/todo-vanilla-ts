import { ObjectType } from './types'

export function isObject (value: ObjectType | unknown) {
  return Object.prototype.toString.call(value) === '[object Object]'
}

export function isEmptyObject (obj: ObjectType) {
  return !(isObject(obj) && Object.keys(obj).length > 0)
}

export function areDeepEqual (object1: ObjectType, object2: ObjectType) {
  const objKeys1 = Object.keys(object1)
  const objKeys2 = Object.keys(object2)

  if (objKeys1.length !== objKeys2.length) return false

  for (const key of objKeys1) {
    const value1 = object1[key]
    const value2 = object2[key]

    if (!areDeepEqual(value1, value2)) {
      return false
    }
  }
  return true
}

export function merge (target: ObjectType, source: ObjectType): object {
  function isDeep (prop: string) {
    return isObject(source[prop]) && Object.hasOwn(target, prop) && isObject(target[prop])
  }

  const replaced = Object.getOwnPropertyNames(source)
    .map(prop => ({ [prop]: isDeep(prop) ? merge(target[prop], source[prop]) : source[prop] }))
    .reduce((a, b) => ({ ...a, ...b }), {})

  return {
    ...(target as object),
    ...(replaced as object)
  }
}

export function domEl (tag: string, attributes: ObjectType, ...children: (HTMLElement | string)[]) {
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
