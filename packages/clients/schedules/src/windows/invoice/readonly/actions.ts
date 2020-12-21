import { useState } from 'react'

import { ipcRenderer } from 'electron'

import { store } from '~/store'
import { IInvoice, ISchedule } from '~/store/modules/schedules/types'
import { RootState } from '~/store/state'

import {
  OPEN_INVOICE_READONLY_MODE,
  OPEN_INVOICE_READONLY_MODE_PAYLOAD
} from './types'

export function openInvoiceReadonlyModeWindow(
  schedule: ISchedule,
  invoice: IInvoice
) {
  const state = store.getState() as RootState

  ipcRenderer.send(
    OPEN_INVOICE_READONLY_MODE,
    schedule,
    invoice,
    state.auth.token
  )
}

export function useInvoiceReadonlyModePayload(): [ISchedule, IInvoice, string] {
  const [token, setToken] = useState<string>()
  const [schedule, setSchedule] = useState<ISchedule>()
  const [invoice, setInvoice] = useState<IInvoice>()

  ipcRenderer.once(
    OPEN_INVOICE_READONLY_MODE_PAYLOAD,
    (_, schedule: ISchedule, invoice: IInvoice, token: string) => {
      setToken(token)
      setSchedule(schedule)
      setInvoice(invoice)
    }
  )

  return [schedule, invoice, token]
}
