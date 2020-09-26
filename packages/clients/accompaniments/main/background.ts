import { app, webContents, ipcMain } from 'electron'
import serve from 'electron-serve'

import { createWindow } from './helpers'

const isProd: boolean = process.env.NODE_ENV === 'production'

if (isProd) {
  serve({ directory: 'app' })
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`)
}

;(async () => {
  await app.whenReady()

  const mainWindow = createWindow('auth', {
    width: 1000,
    height: 600
  })

  if (isProd) {
    await mainWindow.loadURL('app://./auth.html')
  } else {
    const port = process.argv[2]
    await mainWindow.loadURL(`http://localhost:${port}/auth`)
    mainWindow.webContents.openDevTools()
  }
})()

ipcMain.on('openHome', async () => {
  const homeWindow = createWindow('home', {
    width: 1000,
    height: 600
  })

  if (isProd) {
    await homeWindow.loadURL('app://./home.html')
  } else {
    const port = process.argv[2]
    await homeWindow.loadURL(`http://localhost:${port}/home`)
    homeWindow.webContents.openDevTools()
  }
})

ipcMain.on('redux-action', (_, action) => {
  webContents
    .getAllWebContents()
    .forEach(content => content.send('redux-action', action))
})

app.on('window-all-closed', () => {
  app.quit()
})
