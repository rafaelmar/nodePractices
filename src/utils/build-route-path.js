export function buildRoutePath(path) {
    const routeParamaterRegex = /:([a-zA-Z]+)/g
    const pathWithParams = path.replaceAll(routeParamaterRegex, '([a-z0-9\-_]+)')

    const pathRegex = new RegExp(`^${pathWithParams}`)

    return pathRegex
}