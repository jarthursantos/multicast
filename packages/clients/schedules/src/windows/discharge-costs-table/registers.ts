import { BrowserWindow, ipcMain } from 'electron'

import { resolvePath } from '~/windows'

import { OPEN_DISCHARGE_COSTS_TABLE } from './types'

export function registerOpenDischargeTableCostsWindow() {
  let _instance: BrowserWindow

  ipcMain.on(OPEN_DISCHARGE_COSTS_TABLE, () => {
    if (_instance) {
      _instance.focus()
      return
    }

    _instance = new BrowserWindow({
      title: 'Tabela de Descarrego',
      minimizable: false,
      maximizable: false,
      resizable: false,
      height: 500,
      width: 450,
      parent: BrowserWindow.getFocusedWindow(),
      modal: true,
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true
      }
    })

    _instance.on('closed', () => {
      _instance = undefined
    })

    _instance.removeMenu()
    _instance.loadURL(resolvePath('discharge-costs-table'))
    // _instance.webContents.openDevTools()
  })
}
