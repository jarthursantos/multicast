import { useState } from 'react'

import { ipcRenderer, IpcRendererEvent } from 'electron'

import { store } from '~/store'
import { IBillsToPayFilters } from '~/store/modules/billsToPay/types'
import { RootState } from '~/store/state'

import {
  OPEN_BILLS_TO_PAY_FILTERS,
  OPEN_BILLS_TO_PAY_FILTERS_DATA
} from './types'

export function openBillsToPayFilters() {
  const state = store.getState() as RootState

  ipcRenderer.send(
    OPEN_BILLS_TO_PAY_FILTERS,
    state.billsToPay.filters,
    state.auth.token
  )
}

export function useBillsToPayFilters(): [IBillsToPayFilters, string] {
  const [filters, setFilters] = useState<IBillsToPayFilters>()
  const [token, setToken] = useState<string>()

  ipcRenderer.once(
    OPEN_BILLS_TO_PAY_FILTERS_DATA,
    (_: IpcRendererEvent, data: IBillsToPayFilters, token: string) => {
      setFilters(data)
      setToken(token)
    }
  )

  return [filters, token]
}
