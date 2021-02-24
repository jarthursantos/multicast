import { BrowserWindow, ipcMain, IpcMainEvent } from 'electron'
import isDevelopment from 'electron-is-dev'

import { IBillsToPayFilters } from '~/store/modules/billsToPay/types'
import { resolvePath } from '~/windows'

import {
  OPEN_BILLS_TO_PAY_FILTERS,
  OPEN_BILLS_TO_PAY_FILTERS_DATA
} from './types'

export function registerOpenBillsToPayFilters() {
  ipcMain.on(
    OPEN_BILLS_TO_PAY_FILTERS,
    (_: IpcMainEvent, filters: IBillsToPayFilters, token: string) => {
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
        window.webContents.send(OPEN_BILLS_TO_PAY_FILTERS_DATA, filters, token)
      })

      window.removeMenu()

      if (isDevelopment) {
        window.webContents.openDevTools()
      }

      window.loadURL(resolvePath('billsToPayFilters'))
    }
  )
}
