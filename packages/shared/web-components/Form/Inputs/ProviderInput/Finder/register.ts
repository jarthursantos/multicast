import { ipcMain, BrowserWindow } from 'electron'

import { IProvider } from '../index'
import {
  OPEN_PROVIDER_FINDER_WINDOW,
  OPEN_PROVIDER_FINDER_WINDOW_RESULT,
  OPEN_PROVIDER_FINDER_WINDOW_PAYLOAD
} from './types'

export function registerOpenProviderFinderWindow(path: string) {
  ipcMain.on(OPEN_PROVIDER_FINDER_WINDOW, (event, single: boolean) => {
    const window = new BrowserWindow({
      width: 700,
      height: 500,
      maximizable: false,
      resizable: false,
      modal: true,
      parent: BrowserWindow.getFocusedWindow(),
      webPreferences: {
        enableRemoteModule: true,
        nodeIntegration: true
      }
    })

    ipcMain.once(
      OPEN_PROVIDER_FINDER_WINDOW_RESULT,
      (_, providers: IProvider[]) => {
        event.returnValue = providers
      }
    )

    window.on('close', () => {
      event.returnValue = []
    })

    window.webContents.on('did-finish-load', () => {
      window.webContents.send(OPEN_PROVIDER_FINDER_WINDOW_PAYLOAD, single)
    })

    window.removeMenu()
    window.loadURL(path)
    // window.webContents.openDevTools()
  })
}
