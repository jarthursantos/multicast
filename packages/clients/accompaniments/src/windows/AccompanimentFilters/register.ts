import { BrowserWindow, ipcMain, IpcMainEvent } from 'electron'

import { IAccompanimentFilters } from '~/store/modules/accompaniments/types'
import { resolvePath } from '~/windows'

import {
  OPEN_ACCOMPANIMENT_FILTERS,
  OPEN_ACCOMPANIMENT_FILTERS_DATA
} from './types'

export function registerOpenAccompanimentFilters() {
  ipcMain.on(
    OPEN_ACCOMPANIMENT_FILTERS,
    (_: IpcMainEvent, filters: IAccompanimentFilters, token: string) => {
      const window = new BrowserWindow({
        minimizable: false,
        maximizable: false,
        width: 520,
        height: 470,
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
      // window.webContents.openDevTools()

      window.loadURL(resolvePath('accompanimentFilters'))
    }
  )
}
