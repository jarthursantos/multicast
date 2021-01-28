import { useState } from 'react'

import { ipcRenderer } from 'electron'

import { store } from '~/store'
import { ISchedule } from '~/store/modules/schedules/types'
import { RootState } from '~/store/state'

import { OPEN_CREATE_INVOICE, OPEN_CREATE_INVOICE_PAYLOAD } from './types'

export function openCreateInvoiceWindow(schedule: ISchedule) {
  const state = store.getState() as RootState

  ipcRenderer.send(OPEN_CREATE_INVOICE, schedule, state.auth.token)
}

export function useCreateInvoicePayload(): [ISchedule, string] {
  const [schedule, setSchedule] = useState<ISchedule>()
  const [token, setToken] = useState<string>()

  ipcRenderer.once(
    OPEN_CREATE_INVOICE_PAYLOAD,
    (_, schedule: ISchedule, token: string) => {
      setSchedule(schedule)
      setToken(token)
    }
  )

  return [schedule, token]
}
