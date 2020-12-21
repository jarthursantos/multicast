import { useState } from 'react'

import { ipcRenderer } from 'electron'

import { store } from '~/store'
import { IInvoice, ISchedule } from '~/store/modules/schedules/types'
import { RootState } from '~/store/state'

import { OPEN_INVOICE_EDIT_MODE, OPEN_INVOICE_EDIT_MODE_PAYLOAD } from './types'

export function openInvoiceEditModeWindow(
  schedule: ISchedule,
  invoice: IInvoice
) {
  const state = store.getState() as RootState

  ipcRenderer.send(OPEN_INVOICE_EDIT_MODE, schedule, invoice, state.auth.token)
}

export function useInvoiceEditModePayload(): [ISchedule, IInvoice, string] {
  const [token, setToken] = useState<string>()
  const [invoice, setInvoice] = useState<IInvoice>()
  const [schedule, setSchedule] = useState<ISchedule>()

  ipcRenderer.once(
    OPEN_INVOICE_EDIT_MODE_PAYLOAD,
    (_, schedule: ISchedule, invoice: IInvoice, payload: string) => {
      setToken(payload)
      setInvoice(invoice)
      setSchedule(schedule)
    }
  )

  return [schedule, invoice, token]
}
