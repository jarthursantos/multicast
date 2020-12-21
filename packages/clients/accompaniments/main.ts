import { app, ipcMain, webContents } from 'electron'
import isDevelopment from 'electron-is-dev'
import serve from 'electron-serve'

import { registerCreateMailModal } from '@shared/outlook-mail'

import { registerWindows } from '~/windows'

if (isDevelopment) {
  app.setPath('userData', `${app.getPath('userData')} (development)`)
} else {
  serve({ directory: 'app' })
}

app.on('window-all-closed', () => {
  app.quit()
})

ipcMain.on('redux-action', (_, action) => {
  webContents
    .getAllWebContents()
    .forEach(content => content.send('redux-action', action))
})

registerCreateMailModal()
registerWindows()
