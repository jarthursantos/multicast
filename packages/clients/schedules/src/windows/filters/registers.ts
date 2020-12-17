import { BrowserWindow, ipcMain } from 'electron'

import { IScheduleFilters } from '~/store/modules/schedules/types'
import { resolvePath } from '~/windows'

import { OPEN_FILTERS, OPEN_FILTERS_PAYLOAD } from './types'

export function registerOpenFiltersWindow() {
  let _instance: BrowserWindow

  ipcMain.on(OPEN_FILTERS, (_, filters: IScheduleFilters, token: string) => {
    if (_instance) {
      _instance.focus()
      return
    }

    _instance = new BrowserWindow({
      title: 'Filtros',
      minimizable: false,
      maximizable: false,
      resizable: false,
      height: 530,
      width: 450,
      parent: BrowserWindow.getFocusedWindow(),
      modal: true,
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true
      }
    })

    _instance.on('closed', () => {
      _instance = undefined
    })

    _instance.webContents.on('did-finish-load', () => {
      _instance.webContents.send(OPEN_FILTERS_PAYLOAD, filters, token)
    })

    _instance.removeMenu()
    _instance.loadURL(resolvePath('filters'))
    _instance.webContents.openDevTools()
  })
}
