import { BrowserWindow, ipcMain } from 'electron'

import { IInvoice, ISchedule } from '~/store/modules/schedules/types'
import { resolvePath } from '~/windows'

import {
  OPEN_INVOICE_READONLY_MODE,
  OPEN_INVOICE_READONLY_MODE_PAYLOAD
} from './types'

export function registerOpenInvoiceReadonlyModeWindow() {
  const _instances: { [key: string]: BrowserWindow } = {}

  ipcMain.on(
    OPEN_INVOICE_READONLY_MODE,
    (_, schedule: ISchedule, invoice: IInvoice, token: string) => {
      const { id } = invoice

      if (_instances[id]) {
        _instances[id].focus()
        return
      }

      const instance = new BrowserWindow({
        title: `Nota Fiscal ${invoice.number}`,
        maximizable: false,
        resizable: false,
        height: 610,
        width: 1100,
        webPreferences: {
          nodeIntegration: true,
          enableRemoteModule: true
        }
      })

      instance.on('closed', () => delete _instances[id])

      instance.webContents.once('did-finish-load', () => {
        instance.webContents.send(
          OPEN_INVOICE_READONLY_MODE_PAYLOAD,
          schedule,
          invoice,
          token
        )
      })

      instance.removeMenu()
      instance.loadURL(resolvePath('invoice/readonly'))
      // instance.webContents.openDevTools()

      _instances[id] = instance
    }
  )
}
