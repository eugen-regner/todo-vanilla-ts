import classes from './Todos.module.css'
import { StatefulComponent } from '../components/StatefulComponent'

export class Todos extends StatefulComponent {
  constructor () {
    super()
    this.setState({})
  }

  render () {
    this.classList.add(classes.Todos)
    this.innerHTML = '<h2>Todos</h2>'
  }
}

customElements.define('to-dos', Todos)
