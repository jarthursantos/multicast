import { BrowserWindow, ipcMain, IpcMainEvent } from 'electron'
import isDevelopment from 'electron-is-dev'

import { resolvePath } from '~/windows'

import {
  OPEN_PRODUCT_DETAILS,
  OPEN_PRODUCT_DETAILS_DATA,
  Product
} from './types'

export function registerOpenProductDetails() {
  const productWindows: { [key: string]: BrowserWindow } = {}

  ipcMain.on(
    OPEN_PRODUCT_DETAILS,
    (_: IpcMainEvent, product: Product, token: string) => {
      const { code } = product

      if (productWindows[code]) {
        productWindows[code].focus()
      } else {
        const window = new BrowserWindow({
          width: 900,
          height: 500,
          backgroundColor: '#fff',
          webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
          }
        })

        productWindows[code] = window

        window.on('close', () => delete productWindows[code])

        window.webContents.once('did-finish-load', () => {
          window.webContents.send(OPEN_PRODUCT_DETAILS_DATA, product, token)
        })

        window.loadURL(resolvePath('productDetails'))
        window.removeMenu()

        if (isDevelopment) {
          window.webContents.openDevTools()
        }
      }
    }
  )
}
