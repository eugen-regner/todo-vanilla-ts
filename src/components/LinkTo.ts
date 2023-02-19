export class LinkTo extends HTMLElement {

  listenerCallback: (e: MouseEvent) => void

  constructor () {
    super()

    const a = document.createElement('a')
    a.textContent = this.getAttribute('data-text')
    const route = this.getAttribute('to')!

    this.listenerCallback = this.goToLink.bind(this, route)

    a.setAttribute('href', route)
    a.addEventListener('click', this.listenerCallback)
    this.appendChild(a)
  }

  goToLink (route: string, e: MouseEvent) {
    e.preventDefault()
    window.dispatchEvent(new PopStateEvent('popstate', { state: { route } }))
  }

  disconnectedCallback () {
    // FIXME: remove debugger and console.log
    debugger
    console.log('A is', this.querySelector('a'))
    this.querySelector('a')!.removeEventListener('click', this.listenerCallback)
  }
}

customElements.define('link-to', LinkTo)
