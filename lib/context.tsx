import { createContext } from 'react'

export type RouteParams = Record<string, string>

interface RouteContextState {
  params: RouteParams
  path: string
  setPath(newLocation: string): void
  setRouteParams(routeParams: RouteParams): void
  setView(view: string | null): void
  view: string | null
}

export let RouteContext = createContext<RouteContextState>({
  params: {},
  path: location.pathname,
  setPath() {},
  setView() {},
  setRouteParams() {},
  view: null,
})

RouteContext.displayName = 'Router'
