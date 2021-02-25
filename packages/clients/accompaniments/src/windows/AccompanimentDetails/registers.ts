import { BrowserWindow, ipcMain, IpcMainEvent } from 'electron'
import isDevelopment from 'electron-is-dev'

import { Accompaniment } from '~/store/modules/accompaniments/types'
import { resolvePath } from '~/windows'

import {
  OPEN_ACCOMPANIMENT_DETAILS,
  OPEN_ACCOMPANIMENT_DETAILS_DATA
} from './types'

export function registerOpenAccompanimentDetails() {
  const accompanimentWindows: { [key: string]: BrowserWindow } = {}

  ipcMain.on(
    OPEN_ACCOMPANIMENT_DETAILS,
    (_: IpcMainEvent, accompaniment: Accompaniment, token: string) => {
      const { id } = accompaniment

      if (accompanimentWindows[id]) {
        accompanimentWindows[id].focus()
      } else {
        const window = new BrowserWindow({
          width: 1160,
          height: 560,
          minHeight: 560,
          // height: 670,
          // minHeight: 670,
          minWidth: 1000,
          backgroundColor: '#fff',
          webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
          }
        })

        accompanimentWindows[id] = window

        window.on('close', () => delete accompanimentWindows[id])

        window.webContents.once('did-finish-load', () => {
          window.webContents.send(
            OPEN_ACCOMPANIMENT_DETAILS_DATA,
            accompaniment,
            token
          )
        })

        window.loadURL(resolvePath('accompanimentDetails'))
        window.removeMenu()

        if (isDevelopment) {
          window.webContents.openDevTools()
        }
      }
    }
  )
}
