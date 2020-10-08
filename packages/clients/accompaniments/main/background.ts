import { app, webContents, ipcMain, BrowserWindow } from 'electron'
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
    height: 580
  })

  mainWindow.on('closed', () => {
    app.quit()
  })

  if (isProd) {
    mainWindow.removeMenu()

    await mainWindow.loadURL('app://./auth.html')
  } else {
    const port = process.argv[2]
    await mainWindow.loadURL(`http://localhost:${port}/auth`)
  }
})()

const accompanimentWindows: { [key: string]: BrowserWindow } = {}

ipcMain.on('openAccompaniment', async (_, id: string, token: string) => {
  if (accompanimentWindows[id]) {
    accompanimentWindows[id].focus()
  } else {
    const accompanimentWindow = createWindow('accompaniments', {
      width: 1160,
      height: 620,
      resizable: false,
      webPreferences: {
        enableRemoteModule: true
      }
    })

    accompanimentWindow.removeMenu()

    accompanimentWindows[id] = accompanimentWindow

    accompanimentWindow.webContents.once('did-finish-load', () => {
      accompanimentWindow.webContents.send('params-sended', { id, token })
    })

    accompanimentWindow.on('close', () => {
      delete accompanimentWindows[id]
    })

    if (isProd) {
      await accompanimentWindow.loadURL('app://./accompaniments.html')
    } else {
      const port = process.argv[2]
      await accompanimentWindow.loadURL(
        `http://localhost:${port}/accompaniments`
      )
    }
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
