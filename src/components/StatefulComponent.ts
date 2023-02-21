import { areDeepEqual } from '../utils'
import { ObjectType } from '../types'

export class StatefulComponent extends HTMLElement {
  private state: ObjectType = {}

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
    const newState = updater(this.getState())
    if (!areDeepEqual(newState, this.state)) {
      this.state = newState
      this.doRender()
    }
  }
}
