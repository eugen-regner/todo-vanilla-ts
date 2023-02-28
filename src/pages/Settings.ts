import classes from './Settings.module.css'
import { StatefulComponent } from '../components/StatefulComponent'

export class Settings extends StatefulComponent {
  constructor () {
    super()
    this.setState({})
  }

  render () {
    this.classList.add(classes.Settings)
    this.innerHTML = '<h2>Settings</h2>'
  }
}

customElements.define('app-settings', Settings)
