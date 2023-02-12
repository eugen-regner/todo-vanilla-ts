import classes from './Settings.module.css'

export class Settings extends HTMLElement {
  constructor () {
    super()
    this.render()
  }

  render () {
    const div = document.createElement('div')
    div.classList.add(classes.Settings)
    div.textContent = 'Settings'
    this.appendChild(div)
  }
}

customElements.define('app-settings', Settings)
