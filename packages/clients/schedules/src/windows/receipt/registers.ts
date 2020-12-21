import { BrowserWindow, ipcMain } from 'electron'

import { resolvePath } from '~/windows'

import { OPEN_RECEIPT, OPEN_RECEIPT_PAYLOAD } from './types'

export function registerOpenReceiptWindow() {
  const _instances: { [key: string]: BrowserWindow } = {}

  ipcMain.on(OPEN_RECEIPT, (_, filename: string, url: string) => {
    if (_instances[filename]) {
      _instances[filename].focus()
      return
    }

    const instance = new BrowserWindow({
      title: 'Recibo',
      height: 600,
      width: 900,
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true
      }
    })

    instance.on('closed', () => delete _instances[filename])

    instance.webContents.once('did-finish-load', () => {
      instance.webContents.send(OPEN_RECEIPT_PAYLOAD, filename, url)
    })

    instance.removeMenu()
    instance.loadURL(resolvePath('receipt'))
    // instance.webContents.openDevTools()

    _instances[filename] = instance
  })
}
