import { navigateTo } from '../routes'

export class LinkTo extends HTMLElement {
  listenerCallback: (e: MouseEvent) => void

  constructor () {
    super()

    const route = this.getAttribute('to')!
    this.listenerCallback = this.goToLink.bind(this, route)

    const a = document.createElement('a')
    a.textContent = this.getAttribute('data-text')
    a.setAttribute('href', route)
    a.addEventListener('click', this.listenerCallback)
    this.appendChild(a)
  }

  goToLink (route: string, e: MouseEvent) {
    e.preventDefault()
    navigateTo(route)
  }

  disconnectedCallback () {
    this.querySelector('a')!.removeEventListener('click', this.listenerCallback)
  }
}

customElements.define('link-to', LinkTo)
