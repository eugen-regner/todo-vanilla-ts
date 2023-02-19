import classes from './App.module.css'
import '../components/LinkTo'

const routes = [
  {
    path: '/',
    page: 'to-dos'
  },
  {
    path: '/todos',
    page: 'to-dos'
  },
  {
    path: '/settings',
    page: 'app-settings'
  },
]

// function matchRoute (routes, requestedRoute) {
//
// }

export class App extends HTMLElement {

  #startLocation = window.location.pathname || '/'

  constructor () {
    super()
    this.render()
  }

  render () {

    history.pushState({ route: this.#startLocation }, '')

    const div = document.createElement('div')
    div.classList.add(classes.App)
    // language=HTML
    div.insertAdjacentHTML('afterbegin', `
      <h1>Application</h1>
      <a href="/settings">Settings</a>
      <br />
      <a href="/todos">Todos</a>
      <p>Target Route: <span id="target-route">${this.#startLocation}</span></p>
      <link-to to="/todos" data-text="Go to Todos"></link-to>
      <br />
      <link-to to="/settings" data-text="Go to Settings"></link-to>
    `)

    this.appendChild(div)
    console.log('Render APP')
  }

  connectedCallback () {
    console.log('CONNTECTED')
    this.querySelector('a')!.addEventListener('click', e => {
      console.log('Click', e)
      e.preventDefault()
    })
    window.addEventListener('popstate', this.navigate.bind(this))
    // window.dispatchEvent(new PopStateEvent('popstate', { state: { route: this.#startLocation } }))
    // window.dispatchEvent(new PopStateEvent('popstate', { state: { route: '/hello' } }))
  }

  disconnectedCallback () {
    window.removeEventListener('popstate', this.navigate.bind(this))
  }

  navigate (event: PopStateEvent) {
    const targetRoute = event.state.route

    if (history.state.route !== targetRoute) {
      history.pushState({ route: targetRoute }, '', targetRoute)
    }
    document.querySelector('#target-route')!.textContent = targetRoute
    console.log('NAVIGATION', event.state, history.state)
  }
}

customElements.define('web-app', App)
