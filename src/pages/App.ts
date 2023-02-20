import classes from './App.module.css'
import '../components/LinkTo'
import { navigateTo, normalizeRoute } from "../route";

export class App extends HTMLElement {

  #startLocation = window.location.pathname || '/'

  constructor () {
    super()
    this.render()
  }

  render () {

    function onClick () {
      navigateTo('settings')
    }

    history.pushState({ route: this.#startLocation }, '')

    const div = document.createElement('div')
    div.classList.add(classes.App)
    // language=HTML
    div.insertAdjacentHTML('afterbegin', `
      <h1>Application</h1>
      <p>Target Route: <span id="target-route">${history.state.route}</span></p>
      <link-to to="/todos" data-text="Go to Todos"></link-to>
      <br />
      <link-to to="/settings" data-text="Go to Settings"></link-to>
      <br />
      <button type="button">go to settings</button>
    `)

    div.querySelector('button')!.addEventListener('click', onClick)

    this.appendChild(div)
    console.log('Render APP')
  }

  connectedCallback () {
    window.addEventListener('popstate', this.navigate)
    navigateTo(this.#startLocation)
  }

  disconnectedCallback () {
    window.removeEventListener('popstate', this.navigate)
  }

  navigate (event: PopStateEvent) {
    const targetRoute = normalizeRoute(event.state.route)

    if (history.state.route !== targetRoute) {
      history.pushState({ route: targetRoute }, '', targetRoute)
    }
  }
}

customElements.define('web-app', App)
