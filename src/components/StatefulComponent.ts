import { Listener, ObjectType } from '../lib/types'
import { areDeepEqual } from '../lib/utils'
import { Observable } from '../lib/Observable'

type StateUpdater = (oldState: ObjectType) => ObjectType

// provides structure for components' own state
export class StatefulComponent extends HTMLElement {
  // global state
  private static globalObservable = new Observable()

  protected subscribe (key: string, listener: Listener) {
    StatefulComponent.globalObservable.subscribe(key, listener)
  }

  protected unsubscribe (key: string, listener: Listener) {
    StatefulComponent.globalObservable.unsubscribe(key, listener)
  }

  protected notify (key: string, data?: unknown) {
    StatefulComponent.globalObservable.notify(key, data)
  }

  // local state
  private localState: ObjectType = {}
  private localStateIsInitialized = false

  protected updateOnAttributeChange = false

  protected render (): Node | void {
    const missingContent = document.createElement('h2')
    missingContent.textContent = `<${this.constructor.name} />`
    this.replaceChildren(missingContent)
  }

  protected getState () {
    return structuredClone(this.localState) as ObjectType
  }

  protected setState (updater: StateUpdater | ObjectType) {
    const newState = typeof updater === 'function' ? updater(this.getState()) : updater

    if (!areDeepEqual(newState, this.localState) || !this.localStateIsInitialized) {
      this.localStateIsInitialized = true
      this.localState = newState
      this.render()
    }
  }

  attributeChangedCallback (_name: string, oldValue: string, newValue: string) {
    if (this.updateOnAttributeChange && oldValue !== newValue) {
      this.render()
    }
  }
}
