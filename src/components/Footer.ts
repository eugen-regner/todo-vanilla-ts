import classes from './Footer.module.css'
import { StatefulComponent } from './StatefulComponent'

class Footer extends StatefulComponent {
  constructor () {
    super()
    this.setState({})
  }

  render () {
    this.classList.add(classes.Footer)
    this.textContent = 'footer'
  }
}

customElements.define('app-footer', Footer)
