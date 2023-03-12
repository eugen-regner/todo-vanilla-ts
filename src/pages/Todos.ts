import classes from './Todos.module.css'
import { StatefulComponent } from '../components/StatefulComponent'
import { createUid } from '../lib/utils'
import { ItemStatus, SelectedItemTypes } from '../lib/types'
import '../components/StatusSelector'

interface ItemType {
  id: string,
  title: string,
  status: ItemStatus
}
interface StateType {
  items: ItemType[],
  itemsToShow: ItemType[],
  showByStatus: SelectedItemTypes
}

const initState: StateType = {
  items: [],
  itemsToShow: [],
  showByStatus: 'all'
}

export class Todos extends StatefulComponent {
  connectedCallback () {
    // setting state triggers rendering
    this.setState(initState)

    this.addEventListener('keyup', this.onEnter.bind(this))

    addEventListener('load', () => {
      this.querySelector('input')?.focus()
    })

    // show only active items
    this.subscribe('select-active', () => {
      this.setState(oldState => ({
        ...oldState,
        itemsToShow: this.getItemsByStatus('active', oldState.items),
        showByStatus: 'active'
      }))
    })

    // show only completed items
    this.subscribe('select-completed', () => {
      this.setState(oldState => ({
        ...oldState,
        itemsToShow: this.getItemsByStatus('completed', oldState.items),
        showByStatus: 'completed'
      }))
    })

    // show all items
    this.subscribe('select-all', () => {
      this.setState(oldState => ({
        ...oldState,
        itemsToShow: oldState.items,
        showByStatus: 'all'
      }))
    })

    // remove completed items and never show them again
    this.subscribe('clear-completed', () => {
      this.setState(oldState => {
        return {
          ...oldState,
          items: oldState.items.filter((item: ItemType) => item.status !== 'completed'),
          itemsToShow: oldState.itemsToShow.filter((item: ItemType) => item.status !== 'completed')
        }
      })
    })
  }

  getItemsByStatus (status: SelectedItemTypes, items: ItemType[]) {
    if (status === 'all') return items
    return items.filter((item: ItemType) => item.status === status)
  }

  onEnter (e: KeyboardEvent) {
    if (e.key === 'Enter') {
      const fieldValue = (e.target as HTMLInputElement).value.trim()
      if (fieldValue) {
        this.setState(oldState => {
          const items = [...oldState.items, {
            id: createUid(),
            title: fieldValue,
            status: 'active'
          }]

          return {
            ...oldState,
            items,
            itemsToShow: this.getItemsByStatus(oldState.showByStatus, items)
          }
        })

        this.notify('add-item', this.getState().items)
      }
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
    for (const item of this.getState().itemsToShow as ItemType[]) {
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
