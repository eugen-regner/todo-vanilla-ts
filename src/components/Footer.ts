import classes from './Footer.module.css'
import { StatefulComponent } from './StatefulComponent'

class Footer extends StatefulComponent {
  constructor () {
    super()
    this.setState((oldState) => ({ ...oldState, name: 'Eugen' }))
  }

  render () {
    console.log('Footer rendering')
    // FIXME: replace div with footer
    const div = document.createElement('div')
    div.classList.add(classes.Footer)
    div.textContent = 'footer'
    return div
  }
}

customElements.define('app-footer', Footer)
