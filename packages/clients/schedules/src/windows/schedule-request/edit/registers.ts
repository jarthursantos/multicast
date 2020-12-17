import { BrowserWindow, ipcMain } from 'electron'

import { IScheduleRequest } from '~/store/modules/schedule-requests/types'
import { resolvePath } from '~/windows'

import {
  OPEN_EDIT_SCHEDULE_REQUEST,
  OPEN_EDIT_SCHEDULE_REQUEST_PAYLOAD
} from './types'

export function registerOpenEditScheduleRequestWindow() {
  const _instances: { [key: string]: BrowserWindow } = {}

  ipcMain.on(
    OPEN_EDIT_SCHEDULE_REQUEST,
    (_, scheduleRequest: IScheduleRequest, token: string) => {
      const { id } = scheduleRequest

      if (_instances[id]) {
        _instances[id].focus()
        return
      }

      const instance = new BrowserWindow({
        title: 'Editar Pré Agendamento',
        maximizable: false,
        resizable: false,
        height: 400,
        width: 350,
        webPreferences: {
          nodeIntegration: true,
          enableRemoteModule: true
        }
      })

      instance.on('closed', () => delete _instances[id])

      instance.webContents.once('did-finish-load', () => {
        instance.webContents.send(
          OPEN_EDIT_SCHEDULE_REQUEST_PAYLOAD,
          scheduleRequest,
          token
        )
      })

      instance.removeMenu()
      instance.loadURL(resolvePath('schedule-request/edit'))
      // instance.webContents.openDevTools()

      _instances[id] = instance
    }
  )
}
