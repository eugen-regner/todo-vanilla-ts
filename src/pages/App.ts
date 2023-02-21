import classes from './App.module.css'
import '../components/LinkTo'
import { navigateTo, normalizeRoute } from '../routes'
import { CustomComponent } from '../components/CustomComponent'

export class App extends CustomComponent {
  private readonly startLocation = window.location.pathname || '/'

  constructor () {
    super()
    history.pushState({ route: this.startLocation }, '')

    this.setState(() => ({
      position: 'Engineer',
      user: {
        name: 'Eugen',
        age: 47
      },
      route: this.startLocation
    }))
  }

  render () {
    const div = document.createElement('div')
    div.classList.add(classes.App)
    // language=HTML
    div.insertAdjacentHTML('afterbegin', `
      <h1>Application</h1>
      <p>Init target route: <span id="target-route">${history.state.route}</span></p>
      <link-to to="/todos" data-text="Go to Todos"></link-to>
      <br />
      <link-to to="/settings" data-text="Go to Settings"></link-to>
    `)

    console.log('Render APP')
    return div
  }

  connectedCallback () {
    console.log('Connected App')

    // FIXME: solve binding problem
    window.addEventListener('popstate', this.navigate.bind(this))
    navigateTo(this.startLocation)
  }

  disconnectedCallback () {
    window.removeEventListener('popstate', this.navigate)
  }

  navigate (event: PopStateEvent) {
    const targetRoute = normalizeRoute(event.state.route)

    if (history.state.route !== targetRoute) {
      history.pushState({ route: targetRoute }, '', targetRoute)
      this.setState((oldState) => ({ ...oldState, route: targetRoute }))
    }
  }
}

customElements.define('web-app', App)
