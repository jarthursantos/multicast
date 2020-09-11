import { app, ipcMain } from 'electron'

import { WindowManager } from '@shared/window-manager'

const windowManager = new WindowManager({
  webPreferences: {
    nodeIntegration: true
  }
})

app.on('ready', () =>
  windowManager.createMainWindow({
    width: 900,
    height: 600
  })
)

app.allowRendererProcessReuse = true

ipcMain.on('openAbout', () => {
  windowManager.createWindow('about', {
    width: 500,
    height: 500
  })
})
