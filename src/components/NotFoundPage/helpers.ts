const extractHref = () => {
  const {requestHeaders} = (global as any).__incrementalCache
  const {host} = requestHeaders
  const path = requestHeaders['x-invoke-path']
  return [host, path].join('/')
}

export const extractUrl = () => extractHref()

export const extractId = () => extractHref().split('/').at(-1)
