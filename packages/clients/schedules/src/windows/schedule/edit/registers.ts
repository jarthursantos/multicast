import { BrowserWindow, ipcMain } from 'electron'

import { ISchedule } from '~/store/modules/schedules/types'
import { resolvePath } from '~/windows'

import {
  OPEN_EDIT_CLOSED_SCHEDULE,
  OPEN_EDIT_CLOSED_SCHEDULE_PAYLOAD,
  OPEN_EDIT_OPENED_SCHEDULE,
  OPEN_EDIT_OPENED_SCHEDULE_PAYLOAD
} from './types'

export function registerOpenEditOpenedScheduleWindow() {
  const _instances: { [key: string]: BrowserWindow } = {}

  ipcMain.on(
    OPEN_EDIT_OPENED_SCHEDULE,
    (_, schedule: ISchedule, token: string) => {
      const { id } = schedule

      if (_instances[id]) {
        _instances[id].focus()
        return
      }

      const instance = new BrowserWindow({
        title: `Editar Agendamento ${schedule.shippingName.toUpperCase()}`,
        maximizable: false,
        resizable: false,
        height: 400,
        width: 950,
        webPreferences: {
          nodeIntegration: true,
          enableRemoteModule: true
        }
      })

      instance.on('closed', () => delete _instances[id])

      instance.webContents.once('did-finish-load', () => {
        instance.webContents.send(
          OPEN_EDIT_OPENED_SCHEDULE_PAYLOAD,
          schedule,
          token
        )
      })

      instance.removeMenu()
      instance.loadURL(resolvePath('schedule/edit-opened'))
      // instance.webContents.openDevTools()

      _instances[id] = instance
    }
  )
}

export function registerOpenEditClosedScheduleWindow() {
  const _instances: { [key: string]: BrowserWindow } = {}

  ipcMain.on(
    OPEN_EDIT_CLOSED_SCHEDULE,
    (_, schedule: ISchedule, token: string) => {
      const { id } = schedule

      if (_instances[id]) {
        _instances[id].focus()
        return
      }

      const instance = new BrowserWindow({
        title: `Editar Agendamento ${schedule.shippingName.toUpperCase()}`,
        maximizable: false,
        resizable: false,
        height: 400,
        width: 950,
        webPreferences: {
          nodeIntegration: true,
          enableRemoteModule: true
        }
      })

      instance.on('closed', () => delete _instances[id])

      instance.webContents.once('did-finish-load', () => {
        instance.webContents.send(
          OPEN_EDIT_CLOSED_SCHEDULE_PAYLOAD,
          schedule,
          token
        )
      })

      instance.removeMenu()
      instance.loadURL(resolvePath('schedule/edit-closed'))
      // instance.webContents.openDevTools()

      _instances[id] = instance
    }
  )
}
