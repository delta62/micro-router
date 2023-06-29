import { PropsWithChildren, useState, useEffect } from 'react'
import { RouteContext, RouteParams } from './context'

export function RouteProvider({ children }: PropsWithChildren<{}>) {
  let [href, setHref] = useState(location.pathname)
  let [params, setParams] = useState({})
  let [view, setViewInternal] = useState<string | null>(
    location.hash ? location.hash.substring(1) : null
  )

  let onPopState = () => {
    setHref(location.pathname)
    setViewInternal(location.hash ? location.hash.substring(1) : null)
  }

  let setPath = (path: string) => {
    history.pushState(null, '', path)
    setHref(path)
    setViewInternal(null)
  }

  let setView = (view: string | null) => {
    // Short circuit when setting view redundantly
    if (
      (view && location.hash.substring(1) === view) ||
      (!view && !location.hash)
    ) {
      return
    }

    if (view) {
      history.pushState(null, '', `${href}#${view}`)
      setViewInternal(view)
    } else {
      history.pushState(null, '', href)
      setViewInternal(view)
    }
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
