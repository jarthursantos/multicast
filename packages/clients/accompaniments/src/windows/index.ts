import { app, BrowserWindow } from 'electron'
import isDevelopment from 'electron-is-dev'

import { registerOpenAccompanimentDetails } from './AccompanimentDetails/registers'
import { registerOpenAccompanimentFilters } from './AccompanimentFilters/register'

export function resolvePath(path: string) {
  if (isDevelopment) {
    const port = process.argv[2] || 8888

    return `http://localhost:${port}/${path}`
  }

  return `app://./${path}.html`
}

export async function registerWindows() {
  await app.whenReady()

  const mainWindow = new BrowserWindow({
    title: 'FollowUP Compras',
    width: 1000,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  mainWindow.removeMenu()
  mainWindow.loadURL(resolvePath('auth'))

  registerOpenAccompanimentDetails()
  registerOpenAccompanimentFilters(mainWindow)
}