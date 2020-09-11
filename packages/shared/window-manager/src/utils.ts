import { join } from 'path'
import * as url from 'url'

export function resolveURL(path?: string) {
  if (process.env.NODE_ENV === 'development') {
    return `http://localhost:4000/#/${path || ''}`
  } else {
    return `${url.format({
      pathname: join(__dirname, 'renderer/index.html'),
      protocol: 'file:',
      slashes: true
    })}#/${path || ''}`
  }
}
