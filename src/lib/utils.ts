import { ObjectType } from './types'

export function isObject (value: ObjectType | unknown) {
  return Object.prototype.toString.call(value) === '[object Object]'
}

export function isEmptyObject (obj: ObjectType) {
  return !(isObject(obj) && Object.keys(obj).length > 0)
}

export function areDeepEqual (a: any, b: any): boolean {
  // shallow check
  if (a === b) return true

  // determining types
  const typeA = Object.prototype.toString.call(a)
  const typeB = Object.prototype.toString.call(b)

  // if types are not equal
  if (typeA !== typeB) return false

  // comparing if object
  if (typeA === '[object Object]') {
    if (Object.keys(a) !== Object.keys(b)) return false
    for (const key in a) { if (!areDeepEqual(a[key], b[key])) return false }
    return true
  } else if (typeA === '[object Array]') {
    if (a.length !== b.length) return false
    for (let i = 0; i < a.length; i++) { if (!areDeepEqual(a[i], b[i])) return false }
    return true
  } else if (typeA === '[object Map]') {
    if (a.keys().length !== b.keys().length) return false
    for (const key of a.keys()) { if (!areDeepEqual(a.get(key), b.get(key))) return false }
    return true
  } else if (typeA === '[object Set]') {
    const x = [...a]
    const y = [...b]
    return areDeepEqual(x, y)
  } else if (typeA === '[object Undefined]' || typeA === '[object Null]') { return true }

  // nothing matched
  return false
}

export function areDeepEqual2 (object1: ObjectType, object2: ObjectType) {
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

export function createUuid () {
  let i, random
  let uuid = ''
  for (i = 0; i < 32; i++) {
    random = Math.random() * 16 | 0
    if (i === 8 || i === 12 || i === 16 || i === 20) {
      uuid += '-'
    }
    uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
      .toString(16)
  }
  return uuid
}
