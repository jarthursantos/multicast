import { BrowserWindow, ipcMain, IpcMainEvent } from 'electron'
import isDevelopment from 'electron-is-dev'

import { resolvePath } from '~/windows'

import { OPEN_CREATE_SCHEDULE, OPEN_CREATE_SCHEDULE_DATA } from './types'

export function registerOpenCreateSchedule() {
  ipcMain.on(OPEN_CREATE_SCHEDULE, (_: IpcMainEvent, token: string) => {
    const window = new BrowserWindow({
      minimizable: false,
      maximizable: false,
      width: 450,
      height: 600,
      resizable: false,
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true
      }
    })

    window.webContents.once('did-finish-load', () => {
      window.webContents.send(OPEN_CREATE_SCHEDULE_DATA, token)
    })

    window.removeMenu()

    if (isDevelopment) {
      window.webContents.openDevTools()
    }

    window.loadURL(resolvePath('createSchedule'))
  })
}
