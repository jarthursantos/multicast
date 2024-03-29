import { app, BrowserWindow } from 'electron'
import isDevelopment from 'electron-is-dev'

import { registerOpenBuyerFinderWindow } from '@shared/web-components/Form/Inputs/BuyerInput/Finder/register'
import { registerOpenProviderFinderWindow } from '@shared/web-components/Form/Inputs/ProviderInput/Finder/register'

import { registerOpenAccompanimentDetails } from './AccompanimentDetails/registers'
import { registerOpenAccompanimentFilters } from './AccompanimentFilters/register'
import { registerOpenBillsToPayFilters } from './BillsToPayFilters/register'
import { registerOpenCreateSchedule } from './CreateSchedule/register'
import { registerOpenProductDetails } from './ProductDetails/register'

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

  mainWindow.on('close', () => {
    BrowserWindow.getAllWindows().forEach(window => {
      try {
        window.close()
      } catch (error) {
        console.error({ error })
      }
    })
  })

  mainWindow.removeMenu()
  mainWindow.loadURL(resolvePath('auth'))

  if (isDevelopment) {
    mainWindow.webContents.openDevTools()
  }

  registerOpenAccompanimentDetails()
  registerOpenAccompanimentFilters()

  registerOpenBillsToPayFilters()

  registerOpenCreateSchedule()

  registerOpenProductDetails()

  registerOpenBuyerFinderWindow(resolvePath('buyersFinder'))
  registerOpenProviderFinderWindow(resolvePath('providersFinder'))
}
