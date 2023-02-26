import { areDeepEqual } from '../utils'
import { ObjectType } from '../types'

type StateUpdater = (oldState: ObjectType) => ObjectType

export class StatefulComponent extends HTMLElement {
  private state: ObjectType = {}
  private stateIsInitialized = false

  protected updateOnAttributeChange = false

  protected doRender (node?: Node) {
    this.replaceChildren(node || this.render())
  }

  protected render () {
    return document.createElement('')
  }

  protected getState () {
    return structuredClone(this.state) as ObjectType
  }

  protected setState (updater: StateUpdater | ObjectType) {
    const newState = typeof updater === 'function' ? updater(this.getState()) : updater

    if (!areDeepEqual(newState, this.state) || !this.stateIsInitialized) {
      this.stateIsInitialized = true
      this.state = newState
      this.doRender()
    }
  }

  attributeChangedCallback (_name: string, oldValue: string, newValue: string) {
    if (this.updateOnAttributeChange && oldValue !== newValue) {
      this.doRender()
    }
  }
}
