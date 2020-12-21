import { BrowserWindow, ipcMain, IpcMainEvent } from 'electron'

import { AccompanimentFilters } from '~/store/modules/accompaniments/types'
import { resolvePath } from '~/windows'

import {
  OPEN_ACCOMPANIMENT_FILTERS,
  OPEN_ACCOMPANIMENT_FILTERS_DATA
} from './types'

export function registerOpenAccompanimentFilters(parentWindow: BrowserWindow) {
  ipcMain.on(
    OPEN_ACCOMPANIMENT_FILTERS,
    (_: IpcMainEvent, filters: AccompanimentFilters, token: string) => {
      const window = new BrowserWindow({
        parent: parentWindow,
        modal: true,
        minimizable: false,
        maximizable: false,
        width: 500,
        height: 565,
        resizable: false,
        webPreferences: {
          nodeIntegration: true,
          enableRemoteModule: true
        }
      })

      window.webContents.once('did-finish-load', () => {
        window.webContents.send(OPEN_ACCOMPANIMENT_FILTERS_DATA, filters, token)
      })

      window.removeMenu()
      window.webContents.openDevTools()

      window.loadURL(resolvePath('accompanimentFilters'))
    }
  )
}
