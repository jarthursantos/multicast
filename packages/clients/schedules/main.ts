import { app, dialog, ipcMain, webContents, BrowserWindow } from 'electron'
import isDevelopment from 'electron-is-dev'
import serve from 'electron-serve'
import fs from 'fs'
import fetch from 'node-fetch'
import os from 'os'
import path from 'path'
import pdfPrinter from 'pdf-to-printer'

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

ipcMain.on('save-request', async (event, name, url) => {
  const { canceled, filePath } = await dialog.showSaveDialog(
    BrowserWindow.getFocusedWindow(),
    {
      title: 'Salvar PDF',
      defaultPath: name,
      filters: [
        { name: 'Arquivos PDF (*.pdf)', extensions: ['pdf'] },
        { name: 'Todos os Arquivos (*)', extensions: ['*'] }
      ]
    }
  )

  if (!canceled) {
    try {
      await downloadPDF(url, filePath)

      event.reply('save-result', 'saved')
    } catch (error) {
      event.reply('save-result', 'failed')
    }
  } else {
    event.reply('save-result', 'canceled')
  }
})

ipcMain.on('print-request', async (event, url) => {
  const pdfPath = path.join(os.tmpdir(), `${randomString()}.pdf`)

  try {
    const pdf = await downloadPDF(url, pdfPath)

    try {
      await pdfPrinter.print(pdf)

      event.reply('print-result', true)
    } catch (error) {
      event.reply('print-result', false)
    } finally {
      remove(pdf)
    }
  } catch (error) {
    event.reply('print-result', false)
  }
})

function save(buffer: any, pdfPath: string) {
  fs.writeFileSync(pdfPath, buffer, 'binary')

  return pdfPath
}

function remove(pdf: string) {
  fs.unlinkSync(pdf)
}

function randomString() {
  return Math.random().toString(36).substring(7)
}

async function downloadPDF(url: string, pdfPath: string) {
  const response = await fetch(url)
  const buffer = await response.buffer()

  const pdf = save(buffer, pdfPath)

  return pdf
}

registerWindows()
