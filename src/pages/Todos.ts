import classes from './Todos.module.css'
import { StatefulComponent } from '../components/StatefulComponent'
import { createUid } from '../lib/utils'
import { HTMLElementEvent } from '../lib/types'

type ItemStatus = 'active' | 'completed'
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

    // @ts-ignore
    this.querySelector('input')!.addEventListener('input', this.onInputChange.bind(this))
    this.querySelector('input')!.addEventListener('keyup', this.onEnter.bind(this))
  }

  onEnter (e: KeyboardEvent) {
    if (e.key === 'Enter') {
      // @ts-ignore
      this.setState(oldState => {
        const items = [...oldState.items, {
          id: createUid(),
          // @ts-ignore
          title: e.target.value,
          status: 'active'
        }]
        return {
          ...oldState,
          items
        }
      })
    }
  }

  onInputChange (e: HTMLElementEvent<HTMLInputElement>) {
    console.log('input change', this.getState(), e.target.value)
  }

  render () {
    this.classList.add(classes.Todos)

    // page title
    const h1 = document.createElement('h1')
    h1.textContent = 'Todo'

    // input
    const input = document.createElement('input')
    input.setAttribute('type', 'text')
    input.setAttribute('name', 'todo-item')

    // list of items
    const ul = document.createElement('ul')
    for (const item of this.getState().items as ItemType[]) {
      const li = document.createElement('li')
      li.textContent = item.title
      ul.appendChild(li)
    }

    this.replaceChildren(h1, input, ul)
  }
}

customElements.define('to-dos', Todos)
