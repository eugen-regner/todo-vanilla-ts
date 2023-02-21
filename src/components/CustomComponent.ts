import { areDeepEqual } from '../utils'
import { ObjectType } from '../types'

export class CustomComponent extends HTMLElement {
  private state: ObjectType = {}

  constructor () {
    super()
    this.doRender()
  }

  private doRender () {
    this.replaceChildren(this.render())
  }

  protected render () {
    return document.createElement('')
  }

  protected getState () {
    return structuredClone(this.state)
  }

  protected setState (updater: (oldState: ObjectType) => ObjectType) {
    const newState = updater(this.state)
    if (!areDeepEqual(newState, this.state)) {
      this.state = newState
      this.doRender()
    }
  }
}
