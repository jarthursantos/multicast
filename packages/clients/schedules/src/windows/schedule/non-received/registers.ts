import { BrowserWindow, ipcMain } from 'electron'

import { ISchedule } from '~/store/modules/schedules/types'
import { resolvePath } from '~/windows'

import {
  OPEN_NON_RECEIVED_SCHEDULE,
  OPEN_NON_RECEIVED_SCHEDULE_PAYLOAD
} from './types'

export function registerOpenNonReceivedScheduleWindow() {
  const _instances: { [key: string]: BrowserWindow } = {}

  ipcMain.on(
    OPEN_NON_RECEIVED_SCHEDULE,
    (_, schedule: ISchedule, token: string) => {
      const { id } = schedule

      if (_instances[id]) {
        _instances[id].focus()
        return
      }

      const instance = new BrowserWindow({
        title: `Agendamento ${schedule.shippingName.toUpperCase()}`,
        maximizable: false,
        resizable: false,
        height: 450,
        width: 900,
        parent: BrowserWindow.getFocusedWindow(),
        modal: true,
        webPreferences: {
          nodeIntegration: true,
          enableRemoteModule: true
        }
      })

      instance.on('closed', () => delete _instances[id])

      instance.webContents.once('did-finish-load', () => {
        instance.webContents.send(
          OPEN_NON_RECEIVED_SCHEDULE_PAYLOAD,
          schedule,
          token
        )
      })

      instance.removeMenu()
      instance.loadURL(resolvePath('schedule/non-received'))
      // instance.webContents.openDevTools()

      _instances[id] = instance
    }
  )
}
