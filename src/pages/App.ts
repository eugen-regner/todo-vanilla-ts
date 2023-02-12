import classes from './App.module.css'

export class App extends HTMLElement {
  constructor () {
    super()
    this.render()
  }

  render () {
    const div = document.createElement('div')
    div.classList.add(classes.App)
    div.textContent = 'APP'
    this.appendChild(div)
  }
}

customElements.define('web-app', App)
