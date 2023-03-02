import { ObjectType } from '../lib/types'
import { areDeepEqual } from '../lib/utils'

type StateUpdater = (oldState: ObjectType) => ObjectType

// provides structure for components' own state
export class StatefulComponent extends HTMLElement {
  private state: ObjectType = {}
  private stateIsInitialized = false

  protected updateOnAttributeChange = false

  protected render (): Node | void {
    const missingContent = document.createElement('h2')
    missingContent.textContent = `<${this.constructor.name} />`
    this.replaceChildren(missingContent)
  }

  protected getState () {
    return structuredClone(this.state) as ObjectType
  }

  protected setState (updater: StateUpdater | ObjectType) {
    const newState = typeof updater === 'function' ? updater(this.getState()) : updater

    if (!areDeepEqual(newState, this.state) || !this.stateIsInitialized) {
      this.stateIsInitialized = true
      this.state = newState
      this.render()
    }
  }

  attributeChangedCallback (_name: string, oldValue: string, newValue: string) {
    if (this.updateOnAttributeChange && oldValue !== newValue) {
      this.render()
    }
  }
}
