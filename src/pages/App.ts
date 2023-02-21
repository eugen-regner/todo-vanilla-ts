import classes from './App.module.css'
import '../components/LinkTo'
import { getRoutesComponent, navigateTo, normalizeRoute } from '../routes'
import { StatefulComponent } from '../components/StatefulComponent'
import './Settings'
import './Todos'

export class App extends StatefulComponent {
  private readonly startLocation = normalizeRoute(window.location.pathname)

  constructor () {
    super()

    this.setComponentsRoute(this.startLocation)

    // handle init route
    history.pushState({ route: this.startLocation }, '')
    window.addEventListener('popstate', this.navigate.bind(this))
    navigateTo(this.startLocation)
  }

  render () {
    const div = document.createElement('div')
    div.classList.add(classes.App)
    // language=HTML
    div.insertAdjacentHTML('afterbegin', `
      <h1>Application</h1>
      <p>Init target route: <span id="target-route">${history.state.route}</span></p>
      <link-to to="/todos" data-text="Go to Todos"></link-to>
      <${this.getState().component.page}></${this.getState().component.page}>
      <br />
      <link-to to="/settings" data-text="Go to Settings"></link-to>
    `)

    console.log('Render APP', this.getState())
    return div
  }

  private setComponentsRoute (targetRoute: string) {
    this.setState(() => ({
      route: targetRoute,
      component: getRoutesComponent(targetRoute)
    }))
  }

  private navigate (event: PopStateEvent) {
    const targetRoute = normalizeRoute(event.state.route)

    if (history.state.route !== targetRoute) {
      history.pushState({ route: targetRoute }, '', targetRoute)
      this.setComponentsRoute(targetRoute)
    }
  }
}

customElements.define('web-app', App)
