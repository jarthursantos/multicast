import { app, ipcMain } from 'electron'

import { WindowManager } from '@shared/window-manager'

const windowManager = new WindowManager({
  webPreferences: {
    nodeIntegration: true
  }
})

let mainWindowID: string
let settingsWindowID: string

app.on('ready', () => {
  mainWindowID = windowManager.createMainWindow({
    width: 900,
    height: 600
  })
})

app.allowRendererProcessReuse = true

ipcMain.on('openSettings', () => {
  settingsWindowID = windowManager.createWindow('settings', {
    width: 350,
    height: 165,
    minimizable: false,
    resizable: false,
    maximizable: false,
    parent: windowManager.getWindow(mainWindowID)
  })
})

ipcMain.on('closeSettings', () => {
  windowManager.getWindow(settingsWindowID)?.close()
})
