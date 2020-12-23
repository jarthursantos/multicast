import { BrowserWindow, ipcMain } from 'electron'

import { ISchedule } from '~/store/modules/schedules/types'
import { resolvePath } from '~/windows'

import { OPEN_CREATE_INVOICE, OPEN_CREATE_INVOICE_PAYLOAD } from './types'

export function registerOpenCreateInvoiceWindow() {
  ipcMain.on(OPEN_CREATE_INVOICE, (_, schedule: ISchedule, token: string) => {
    const instance = new BrowserWindow({
      title: 'Adicionar Nota Fiscal',
      maximizable: false,
      resizable: false,
      height: 610,
      width: 500,
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true
      }
    })

    instance.webContents.once('did-finish-load', () => {
      instance.webContents.send(OPEN_CREATE_INVOICE_PAYLOAD, schedule, token)
    })

    instance.removeMenu()
    instance.loadURL(resolvePath('invoice/create'))
    // instance.webContents.openDevTools()
  })
}
