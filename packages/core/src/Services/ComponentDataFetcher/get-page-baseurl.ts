import resolveUrl from 'resolve-url'

export function GetPageBaseUrl (
  pathname = window.location.pathname
) {
  const pathParts = pathname.split('/')
  const lastPathPart = pathParts.pop()

  if (lastPathPart && !lastPathPart.includes('.')) {
    pathParts.push(lastPathPart)
  }
  return pathParts.join('/')
}

export function ResolveUrl (...args: string[]) {
  return resolveUrl(...args)
}
