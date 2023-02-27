import { areDeepEqual } from '../utils'
import { ObjectType } from '../types'

type StateUpdater = (oldState: ObjectType) => ObjectType

export class StatefulComponent extends HTMLElement {
  private state: ObjectType = {}
  private stateIsInitialized = false

  protected updateOnAttributeChange = false

  protected doRender (node?: Node) {
    console.log('Render:', this.constructor.name)
    this.replaceChildren(node || this.render() || this.renderMissingContent())
  }

  private renderMissingContent () {
    const missingContent = document.createElement('h2')
    missingContent.textContent = `<${this.constructor.name} />`
    return missingContent
  }

  protected render (): Node {
    return this.renderMissingContent()
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
