import classes from './Header.module.css'
import { StatefulComponent } from './StatefulComponent'

class Header extends StatefulComponent {
  constructor () {
    super()
    this.setState({})
  }

  render () {
    this.setAttribute('class', classes.Header)
    this.insertAdjacentText('afterbegin', 'Header')
  }
}

customElements.define('app-header', Header)
