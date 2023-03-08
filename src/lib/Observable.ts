import { Listener, Listeners } from './types'

export class Observable {
  private listeners: Listeners = {}

  subscribe (key: string, listener: Listener) {
    this.listeners[key].push(listener)
  }

  unsubscribe (key: string, listener: Listener) {
    if (this.listeners[key]) {
      this.listeners[key] = this.listeners[key].reduce((acc: Listener[], knownListener) => {
        if (knownListener !== listener) {
          acc.push(knownListener)
        }
        return acc
      }, [])
    }
  }

  notify (key: string, data?: unknown) {
    if (this.listeners[key]) {
      for (const listener of this.listeners[key]) {
        listener(data)
      }
    }
  }
}
