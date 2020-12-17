import { useState } from 'react'

import { ipcRenderer } from 'electron'

import { store } from '~/store'
import { IInvoice } from '~/store/modules/schedules/types'
import { RootState } from '~/store/state'

import {
  OPEN_INVOICE_READONLY_MODE,
  OPEN_INVOICE_READONLY_MODE_PAYLOAD
} from './types'

export function openInvoiceReadonlyModeWindow(invoice: IInvoice) {
  const state = store.getState() as RootState

  ipcRenderer.send(OPEN_INVOICE_READONLY_MODE, invoice, state.auth.token)
}

export function useInvoiceReadonlyModePayload(): [IInvoice, string] {
  const [token, setToken] = useState<string>()
  const [invoice, setInvoice] = useState<IInvoice>()

  ipcRenderer.once(
    OPEN_INVOICE_READONLY_MODE_PAYLOAD,
    (_, invoice: IInvoice, token: string) => {
      setToken(token)
      setInvoice(invoice)
    }
  )

  return [invoice, token]
}
