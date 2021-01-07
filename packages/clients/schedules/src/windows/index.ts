import { app, BrowserWindow } from 'electron'
import installExtension, {
  REACT_DEVELOPER_TOOLS
} from 'electron-devtools-installer'
import isDevelopment from 'electron-is-dev'

import { registerOpenProviderFinderWindow } from '@shared/web-components/Form/Inputs/ProviderInput/Finder/register'

import { registerOpenDischargeTableCostsWindow } from './discharge-costs-table/registers'
import { registerOpenFiltersWindow } from './filters/registers'
import { registerOpenCreateInvoiceWindow } from './invoice/create/registers'
import { registerOpenInvoiceEditModeWindow } from './invoice/edit/registers'
import { registerOpenInvoiceReadonlyModeWindow } from './invoice/readonly/registers'
import { registerOpenReceiptWindow } from './receipt/registers'
import { registerOpenCreateScheduleRequestWindow } from './schedule-request/create/registers'
import { registerOpenEditScheduleRequestWindow } from './schedule-request/edit/registers'
import { registerOpenCreateScheduleWindow } from './schedule/create/registers'
import {
  registerOpenEditClosedScheduleWindow,
  registerOpenEditOpenedScheduleWindow
} from './schedule/edit/registers'
import { registerOpenNonReceivedScheduleWindow } from './schedule/non-received/registers'
import { registerOpenReadonlyScheduleWindow } from './schedule/readonly/registers'
import { registerOpenReceiveScheduleWindow } from './schedule/receive/registers'
import { registerOpenStoppedScheduleWindow } from './schedule/stopped/registers'

export function resolvePath(path: string) {
  if (isDevelopment) {
    const port = process.argv[2] || 8888

    return `http://localhost:${port}/${path}`
  }

  return `app://./${path}.html`
}

export async function registerWindows() {
  await app.whenReady()

  if (!isDevelopment) {
    await installExtension([REACT_DEVELOPER_TOOLS])
  }

  const mainWindow = new BrowserWindow({
    title: 'Agendamentos',
    minWidth: 700,
    minHeight: 700,
    width: 1000,
    height: 700,
    webPreferences: {
      nodeIntegration: true
    }
  })

  mainWindow.on('close', () => {
    BrowserWindow.getAllWindows().forEach(window => {
      try {
        window.close()
      } catch (error) {
        console.log({ error })
      }
    })
  })

  mainWindow.removeMenu()
  mainWindow.loadURL(resolvePath('auth'))
  // mainWindow.webContents.openDevTools()

  registerOpenDischargeTableCostsWindow()
  registerOpenFiltersWindow()

  registerOpenCreateScheduleRequestWindow()
  registerOpenEditScheduleRequestWindow()

  registerOpenCreateScheduleWindow()
  registerOpenEditOpenedScheduleWindow()
  registerOpenEditClosedScheduleWindow()
  registerOpenReceiveScheduleWindow()
  registerOpenStoppedScheduleWindow()
  registerOpenReadonlyScheduleWindow()
  registerOpenNonReceivedScheduleWindow()

  registerOpenCreateInvoiceWindow()
  registerOpenInvoiceReadonlyModeWindow()
  registerOpenInvoiceEditModeWindow()

  registerOpenReceiptWindow()

  registerOpenProviderFinderWindow(resolvePath('providersFinder'))
}
