import classes from './App.module.css'

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
    const div = document.createElement('div')
    div.classList.add(classes.App)
    div.insertAdjacentHTML('afterbegin', '<h1>Application</h1>')
    this.appendChild(div)
    console.log('Render APP')
  }

  connectedCallback () {
    window.addEventListener('popstate', this.navigate.bind(this))
    window.dispatchEvent(new PopStateEvent('popstate', { state: { route: this.#startLocation } }))
  }

  disconnectedCallback () {
    window.removeEventListener('popstate', this.navigate.bind(this))
  }

  navigate (event: PopStateEvent) {
    console.log(event.state.route)
  }
}

customElements.define('web-app', App)
