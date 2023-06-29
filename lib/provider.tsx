import { PropsWithChildren, useState, useEffect } from 'react'
import { RouteContext, RouteParams } from './context'

export function RouteProvider({ children }: PropsWithChildren<{}>) {
  let [href, setHref] = useState(location.pathname)
  let [params, setParams] = useState({})
  let [view, setView] = useState<string | null>(
    location.hash ? location.hash.substring(1) : null
  )

  let onPopState = () => {
    setHref(location.pathname)
    setView(location.hash ? location.hash.substring(1) : null)
  }

  let setPath = (path: string) => {
    history.pushState(null, '', path)
    setHref(path)
    setView(null)
  }

  let setRouteParams = (params: RouteParams) => {
    setParams(params)
  }

  useEffect(() => {
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  return (
    <RouteContext.Provider
      value={{ path: href, setPath, setRouteParams, params, view, setView }}
    >
      {children}
    </RouteContext.Provider>
  )
}
