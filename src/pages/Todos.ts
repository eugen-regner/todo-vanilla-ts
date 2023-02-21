import classes from './Todos.module.css'

export class Todos extends HTMLElement {
  constructor () {
    super()
    this.render()
  }

  render () {
    const div = document.createElement('div')
    div.classList.add(classes.Todos)
    div.innerHTML = '<h2>Todos</h2>'
    this.appendChild(div)
  }
}

customElements.define('to-dos', Todos)
