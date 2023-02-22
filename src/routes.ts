import { Settings } from './pages/Settings'
import { Todos } from './pages/Todos'

const routes = [
  {
    path: '/',
    tag: 'to-dos',
    component: Todos
  },
  {
    path: '/todos',
    tag: 'to-dos',
    component: Todos
  },
  {
    path: '/settings',
    tag: 'app-settings',
    component: Settings
  }
]

export function getRoute (targetedPath: string) {
  return routes.find(route => normalizePath(targetedPath) === route.path) || routes[0]
}

export function navigateTo (routePath: string) {
  window.dispatchEvent(new PopStateEvent('popstate', { state: { route: normalizePath(routePath) } }))
}

export function normalizePath (requestedPath: string) {
  requestedPath = requestedPath.trim()

  if (requestedPath[0] !== '/') requestedPath = '/' + requestedPath

  // TODO: fix unknown routes (404)
  if (!routes.find(knownRoute => knownRoute.path === requestedPath)) {
    requestedPath = '/'
  }

  return requestedPath
}
