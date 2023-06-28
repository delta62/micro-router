import routeMatches from '../lib/route-matches'

describe('does not match', () => {
  test('when the given path is too long', () => {
    let result = routeMatches('/', '/really/long/path')
    expect(result).toBe(false)
  })

  test('when the given path is too short', () => {
    let result = routeMatches('/expected/long/path', '/expected')
    expect(result).toBe(false)
  })

  test('when missing a route parameter', () => {
    let result = routeMatches('/expected/:long/path', '/expected')
    expect(result).toBe(false)
  })

  test('when params are empty', () => {
    let result = routeMatches('/root/:param1/:param2', '/root//param2')
    expect(result).toBe(false)
  })
})

describe('matches', () => {
  test('/', () => {
    let result = routeMatches('/', '/')
    expect(result).toEqual({})
  })

  test('/ with an empty route', () => {
    let result = routeMatches('/', '')
    expect(result).toEqual({})
  })

  test('an empty route with /', () => {
    let result = routeMatches('', '/')
    expect(result).toEqual({})
  })

  test('a literal route', () => {
    let result = routeMatches('/route/to/page', '/route/to/page')
    expect(result).toEqual({})
  })

  test('when the leading slash is missing', () => {
    let result = routeMatches('route/to/page', '/route/to/page')
    expect(result).toEqual({})
  })

  test('when a trailing slash is present', () => {
    let result = routeMatches('/route/to/page', '/route/to/page/')
    expect(result).toEqual({})
  })

  test('when both leading and trailing slashes are added', () => {
    let result = routeMatches('route/to/page', '/route/to/page/')
    expect(result).toEqual({})
  })

  test('when both leading and trailing slashes are removed', () => {
    let result = routeMatches('/route/to/page/', 'route/to/page')
    expect(result).toEqual({})
  })

  test('when a trailing slash is missing', () => {
    let result = routeMatches('/route/to/page/', '/route/to/page')
    expect(result).toEqual({})
  })

  test('a route parameter', () => {
    let result = routeMatches('/page/:pageId', '/page/account')
    expect(result).toEqual({ pageId: 'account' })
  })

  test('many route parameters', () => {
    let result = routeMatches('/:root/:nested/:leaf', '/foo/bar/baz')
    expect(result).toEqual({ root: 'foo', nested: 'bar', leaf: 'baz' })
  })

  test('an optional route parameter which is present', () => {
    let result = routeMatches('/route/?opt', '/route/param')
    expect(result).toEqual({ opt: 'param' })
  })

  test('multiple optional route parameters', () => {
    let result = routeMatches('/route/?opt1/?opt2/?opt3', '/route/p1/p2/p3')
    expect(result).toEqual({ opt1: 'p1', opt2: 'p2', opt3: 'p3' })
  })

  test('an optional route parameter which is missing', () => {
    let result = routeMatches('/route/?opt', '/route')
    expect(result).toEqual({})
  })

  test('an optional route parameter with a trailing slash', () => {
    let result = routeMatches('/route/?opt', '/route/')
    expect(result).toEqual({})
  })

  test('multiple missing optional route parameters', () => {
    let result = routeMatches('/route/?opt1/?opt2/?opt3', '/route/p1')
    expect(result).toEqual({ opt1: 'p1' })
  })
})
