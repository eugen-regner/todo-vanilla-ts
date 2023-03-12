import { StatefulComponent } from './StatefulComponent'
import { SelectItemsCommands } from '../lib/types'
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

    this.addEventListener('click', (e: MouseEvent) => {
      const { name: targetName } = e.target as HTMLButtonElement
      this.notify(targetName as SelectItemsCommands)
    })
  }

  render () {
    this.innerHTML = ''
    // language=HTML
    this.insertAdjacentHTML('afterbegin', `
      <div>Left</div>
      <button class="${classes.all}" name="select-all">All</button>
      <button class="${classes.active}" name="select-active">Active</button>
      <button class="${classes.completed}" name="select-completed">Completed</button>
      <button class="${classes.clearCompleted}" name="clear-completed">Clear completed</button>
    `)
  }
}

customElements.define('status-selector', StatusSelector)
