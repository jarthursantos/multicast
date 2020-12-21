import { useState } from 'react'

import { ipcRenderer } from 'electron'

import { store } from '~/store'
import { IScheduleFilters } from '~/store/modules/schedules/types'
import { RootState } from '~/store/state'

import { OPEN_FILTERS, OPEN_FILTERS_PAYLOAD } from './types'

export function openFiltersWindow() {
  const state = store.getState() as RootState

  ipcRenderer.send(OPEN_FILTERS, state.schedules.filters, state.auth.token)
}

export function useFiltersPayload(): [IScheduleFilters, string] {
  const [token, setToken] = useState<string>()
  const [filters, setFilters] = useState<IScheduleFilters>()

  ipcRenderer.once(
    OPEN_FILTERS_PAYLOAD,
    (_, filters: IScheduleFilters, token: string) => {
      setFilters(filters)
      setToken(token)
    }
  )

  return [filters, token]
}
