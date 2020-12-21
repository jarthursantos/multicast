import { BrowserWindow, ipcMain } from 'electron'

import { resolvePath } from '~/windows'

import {
  OPEN_CREATE_SCHEDULE_REQUEST,
  OPEN_CREATE_SCHEDULE_REQUEST_PAYLOAD
} from './types'

export function registerOpenCreateScheduleRequestWindow() {
  let _instance: BrowserWindow

  ipcMain.on(OPEN_CREATE_SCHEDULE_REQUEST, (_, token: string) => {
    if (_instance) {
      _instance.focus()
      return
    }

    _instance = new BrowserWindow({
      title: 'Adicionar Pré Agendamento',
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
      _instance.webContents.send(OPEN_CREATE_SCHEDULE_REQUEST_PAYLOAD, token)
    })

    _instance.removeMenu()
    _instance.loadURL(resolvePath('schedule-request/create'))
    // _instance.webContents.openDevTools()
  })
}
