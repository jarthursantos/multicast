import { createMail, IEmailOptions } from 'create-outlook-mail'
import { ipcMain, IpcMainEvent } from 'electron'
import fs from 'fs'
import fetch from 'node-fetch'
import os from 'os'
import path from 'path'
import { URL } from 'url'

import {
  CREATE_EMAIL_MODAL_CHANNEL,
  CREATE_EMAIL_MODAL_CHANNEL_CLOSED
} from './types'

export function registerCreateMailModal() {
  ipcMain.on(
    CREATE_EMAIL_MODAL_CHANNEL,
    async (event: IpcMainEvent, mail: IEmailOptions) => {
      const resolvedAttachs: string[] = []
      const downloadedFiles: string[] = []

      const { attachments = [] } = mail

      for (let i = 0; i < attachments.length; i++) {
        const attachment = attachments[i]

        if (isURL(attachment)) {
          const pdfPath = path.join(os.tmpdir(), `${randomString()}.pdf`)
          const downloadedPath = await downloadPDF(attachment, pdfPath)

          resolvedAttachs.push(downloadedPath)
          downloadedFiles.push(downloadedPath)
        } else {
          resolvedAttachs.push(attachment)
        }
      }

      await createMail({ ...mail, attachments: resolvedAttachs }, true)

      for (let i = 0; i < downloadedFiles.length; i++) {
        const filePath = downloadedFiles[i]

        remove(filePath)
      }

      event.sender.send(CREATE_EMAIL_MODAL_CHANNEL_CLOSED)
    }
  )
}

function save(buffer: Buffer, pdfPath: string) {
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

function isURL(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch (err) {
    return false
  }
}
