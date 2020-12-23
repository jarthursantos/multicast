import { BrowserWindow, ipcMain } from 'electron'

import { ISchedule } from '~/store/modules/schedules/types'
import { resolvePath } from '~/windows'

import { OPEN_STOPPED_SCHEDULE, OPEN_STOPPED_SCHEDULE_PAYLOAD } from './types'

export function registerOpenStoppedScheduleWindow() {
  const _instances: { [key: string]: BrowserWindow } = {}

  ipcMain.on(OPEN_STOPPED_SCHEDULE, (_, schedule: ISchedule, token: string) => {
    const { id } = schedule

    if (_instances[id]) {
      _instances[id].focus()
      return
    }

    const instance = new BrowserWindow({
      title: `Agendamento ${schedule.shippingName.toUpperCase()}`,
      maximizable: false,
      resizable: false,
      height: 400,
      width: 900,
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true
      }
    })

    instance.on('closed', () => delete _instances[id])

    instance.webContents.once('did-finish-load', () => {
      instance.webContents.send(OPEN_STOPPED_SCHEDULE_PAYLOAD, schedule, token)
    })

    instance.removeMenu()
    instance.loadURL(resolvePath('schedule/stopped'))
    // instance.webContents.openDevTools()

    _instances[id] = instance
  })
}
