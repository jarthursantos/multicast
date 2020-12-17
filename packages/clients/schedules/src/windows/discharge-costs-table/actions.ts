import { ipcRenderer } from 'electron'

import { OPEN_DISCHARGE_COSTS_TABLE } from './types'

export function openDischargeCostsTableWindow() {
  ipcRenderer.send(OPEN_DISCHARGE_COSTS_TABLE)
}
