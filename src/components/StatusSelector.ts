import { StatefulComponent } from './StatefulComponent'
import classes from './StatusSelector.module.css'

export class StatusSelector extends StatefulComponent {
  connectedCallback () {
    this.classList.add(classes.StatusSelector)
    this.setState(oldState => ({
      ...oldState,
      left: 0,
      active: 0,
      completed: 0
    }))
  }

  render () {
    // language=HTML
    this.insertAdjacentHTML('afterbegin', `
      <div>Left</div>
    `)
  }
}

customElements.define('status-selector', StatusSelector)
