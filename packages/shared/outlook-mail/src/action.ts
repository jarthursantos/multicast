import { IEmailOptions } from 'create-outlook-mail'
import { ipcRenderer } from 'electron'

import {
  CREATE_EMAIL_MODAL_CHANNEL,
  CREATE_EMAIL_MODAL_CHANNEL_CLOSED
} from './types'

const noop = () => {
  /* do nothing */
}

export function createMailModal(
  mail: IEmailOptions,
  onClose: () => void = noop
): () => void {
  ipcRenderer.once(CREATE_EMAIL_MODAL_CHANNEL_CLOSED, onClose)

  ipcRenderer.send(CREATE_EMAIL_MODAL_CHANNEL, mail)

  return () => {
    ipcRenderer.removeListener(CREATE_EMAIL_MODAL_CHANNEL_CLOSED, onClose)
  }
}
