import classes from './Todos.module.css'
import { StatefulComponent } from '../components/StatefulComponent'

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
  items: []
}

export class Todos extends StatefulComponent {
  connectedCallback () {
    this.setState(initState)
  }

  render () {
    this.classList.add(classes.Todos)
    const h1 = document.createElement('h1')
    h1.textContent = 'Todo'
    this.replaceChildren(h1)
  }
}

customElements.define('to-dos', Todos)
