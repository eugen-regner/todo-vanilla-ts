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
  }
]

export function navigateTo (route: string) {
  window.dispatchEvent(new PopStateEvent('popstate', { state: { route: normalizeRoute(route) } }))
}

export function normalizeRoute (requestedRoute: string) {
  requestedRoute = requestedRoute.trim()

  if (requestedRoute[0] !== '/') requestedRoute = '/' + requestedRoute

  // TODO: fix unknown routes
  if (!routes.find(knownRoute => knownRoute.path === requestedRoute)) {
    requestedRoute = '/'
  }

  return requestedRoute
}
