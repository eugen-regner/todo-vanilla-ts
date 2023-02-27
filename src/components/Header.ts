import classes from './Header.module.css'
import { StatefulComponent } from './StatefulComponent'

class Header extends StatefulComponent {
  constructor () {
    super()
    this.setState({})
  }

  render () {
    console.log('Header rendering')
    // FIXME: replace div with header
    const div = document.createElement('div')
    div.setAttribute('class', classes.Header)
    div.insertAdjacentText('afterbegin', 'Header')
    return div
  }
}

customElements.define('app-header', Header)
