import { ipcMain, BrowserWindow } from 'electron'

import { IBuyer } from '../index'
import {
  OPEN_BUYER_FINDER_WINDOW,
  OPEN_BUYER_FINDER_WINDOW_RESULT,
  OPEN_BUYER_FINDER_WINDOW_PAYLOAD
} from './types'

export function registerOpenBuyerFinderWindow(path: string) {
  ipcMain.on(OPEN_BUYER_FINDER_WINDOW, (event, single: boolean) => {
    const window = new BrowserWindow({
      width: 450,
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

    ipcMain.once(OPEN_BUYER_FINDER_WINDOW_RESULT, (_, buyers: IBuyer[]) => {
      event.returnValue = buyers
    })

    window.on('close', () => {
      event.returnValue = []
    })

    window.webContents.on('did-finish-load', () => {
      window.webContents.send(OPEN_BUYER_FINDER_WINDOW_PAYLOAD, single)
    })

    window.removeMenu()
    window.loadURL(path)
    // window.webContents.openDevTools()
  })
}
