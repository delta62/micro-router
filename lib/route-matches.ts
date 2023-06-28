import { RouteParams } from './context'

let id = <T>(x: T) => x

let routeMatches = (routePath: string, currentPath: string) => {
  let routeParts = routePath.split('/').filter(id)
  let currentParts = currentPath.split('/').filter(id)
  let params: RouteParams = {}

  while (routeParts.length > 0 && currentParts.length > 0) {
    let part = routeParts.shift()!
    let test = currentParts.shift()!
    let isOptParam = part[0] === '?'
    let isRequiredParam = part[0] === ':'
    let key = part.substring(1)

    if (isOptParam || isRequiredParam) {
      params[key] = test
    } else if (part !== test) {
      return false
    }
  }

  // Any number of trailing optional route parts may be omitted
  while (routeParts.length > 0 && routeParts[0]![0] === '?') {
    routeParts.shift()
  }

  // Now all route parts should be satisfied, and all path segments should be
  // used
  if (routeParts.length > 0 || currentParts.length > 0) {
    return false
  }

  return params
}

export default routeMatches
