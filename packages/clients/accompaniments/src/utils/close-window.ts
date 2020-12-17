import { remote } from 'electron'

export function closeWindow() {
  remote.getCurrentWindow().close()
}
