import classes from './Todos.module.css'
import { StatefulComponent } from '../components/StatefulComponent'
import { createUid } from '../lib/utils'
import { ItemStatus } from '../lib/types'
import '../components/StatusSelector'

interface ItemType {
  id: string,
  title: string,
  status: ItemStatus
}
interface StateType {
  items: ItemType[]
}

const initState: StateType = {
  items: [
    { id: createUid(), title: 'Clean up', status: 'active' },
    { id: createUid(), title: 'Cook some food', status: 'completed' }
  ]
}

export class Todos extends StatefulComponent {
  connectedCallback () {
    this.setState(initState)

    this.addEventListener('keyup', this.onEnter.bind(this))
    addEventListener('load', () => {
      this.querySelector('input')?.focus()
    })
  }

  onEnter (e: KeyboardEvent) {
    if (e.key === 'Enter') {
      this.setState(oldState => {
        const items = [...oldState.items, {
          id: createUid(),
          title: (e.target as HTMLInputElement).value.trim(),
          status: 'active'
        }]
        return {
          ...oldState,
          items
        }
      });

      (this.querySelector('input[name="new-todo-item"]') as HTMLElement).focus()
    }
  }

  render () {
    this.classList.add(classes.Todos)

    // 1. page title
    const h1 = document.createElement('h1')
    h1.textContent = 'Todo'

    // 2. input field
    const input = document.createElement('input')
    input.setAttribute('type', 'text')
    input.setAttribute('name', 'new-todo-item')

    // 3. list of items
    const ul = document.createElement('ul')
    for (const item of this.getState().items as ItemType[]) {
      const li = document.createElement('li')
      li.textContent = item.title
      ul.appendChild(li)
    }

    this.replaceChildren(h1, input, ul)

    // 4. status selector
    this.insertAdjacentHTML('beforeend', '<status-selector>')
  }
}

customElements.define('to-dos', Todos)
