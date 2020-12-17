import { BrowserWindow, ipcMain } from 'electron'

import { resolvePath } from '~/windows'

import { OPEN_REGISTER_SCHEDULE, OPEN_REGISTER_SCHEDULE_PAYLOAD } from './types'

export function registerOpenCreateScheduleWindow() {
  let _instance: BrowserWindow

  ipcMain.on(OPEN_REGISTER_SCHEDULE, (_, token: string) => {
    if (_instance) {
      _instance.focus()
      return
    }

    _instance = new BrowserWindow({
      title: 'Adicionar Agendamento',
      maximizable: false,
      resizable: false,
      height: 400,
      width: 350,
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true
      }
    })

    _instance.on('closed', () => {
      _instance = undefined
    })

    _instance.webContents.on('did-finish-load', () => {
      _instance.webContents.send(OPEN_REGISTER_SCHEDULE_PAYLOAD, token)
    })

    _instance.removeMenu()
    _instance.loadURL(resolvePath('schedule/create'))
    // _instance.webContents.openDevTools()
  })
}
