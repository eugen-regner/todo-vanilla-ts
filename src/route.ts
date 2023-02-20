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

export function navigateTo (route: string) {
  window.dispatchEvent(new PopStateEvent('popstate', { state: { route: normalizeRoute(route) } }))
}

export function normalizeRoute (route: string) {
  route = route.trim()
  if (route[0] !== '/') route += '/'
  return route
}
