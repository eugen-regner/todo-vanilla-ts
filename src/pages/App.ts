import classes from './App.module.css'
import '../components/LinkTo'
import { getRoute, navigateTo, normalizePath } from '../routes'
import { StatefulComponent } from '../components/StatefulComponent'
import '../components/Header'
import '../components/Footer'

export class App extends StatefulComponent {
  private readonly startLocation = normalizePath(window.location.pathname)

  constructor () {
    super()

    this.setComponentsRoute(this.startLocation)

    window.addEventListener('popstate', this.navigate.bind(this))
    navigateTo(this.startLocation)
  }

  render () {
    console.log('Render:', this.constructor.name)
    const { tag: routesComponent } = this.getState()
    const div = document.createElement('div')
    div.classList.add(classes.App)
    // language=HTML
    div.insertAdjacentHTML('afterbegin', `
      <app-header></app-header>
      
      <!-- route's component -->
      <${routesComponent}></${routesComponent}>
      <!-- route's component -->
     
      <app-footer></app-footer>
    `)

    return div
  }

  private setComponentsRoute (targetPath: string) {
    const { path, tag, component } = getRoute(targetPath)

    if (!customElements.get(tag)) {
      customElements.define(tag, component)
    }

    this.setState(() => ({
      path,
      tag
    }))
    history.pushState({ path }, '', path)
  }

  private navigate (event: PopStateEvent) {
    const targetRoute = normalizePath(event.state.route)

    if (history.state.path !== targetRoute) {
      this.setComponentsRoute(targetRoute)
    }
  }
}

customElements.define('web-app', App)
