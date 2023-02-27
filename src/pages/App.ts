import '../components/LinkTo'
import { getRoute, navigateTo, normalizePath } from '../routes'
import { StatefulComponent } from '../components/StatefulComponent'
import '../components/Header'
import '../components/Footer'
import classes from './App.module.css'

export class App extends StatefulComponent {
  private readonly startLocation = normalizePath(window.location.pathname)

  constructor () {
    super()
    window.addEventListener('popstate', this.navigate.bind(this))
    navigateTo(this.startLocation)

    this.classList.add(classes.WebApp)
    // language=HTML
    this.insertAdjacentHTML('afterbegin', `
      <app-header></app-header>
      <main></main>
      <app-footer></app-footer>
    `)

    // routing (changes state -> re-rendering)
    this.setComponentsRoute(this.startLocation)
  }

  render () {
    const { tag } = this.getState()
    const main = this.querySelector('main')!
    main.replaceChildren()
    // language=HTML
    main.insertAdjacentHTML('afterbegin', `
      <${tag}></${tag}>
    `)
    return this
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
