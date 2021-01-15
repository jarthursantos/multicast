import { useState } from 'react'

import { ipcRenderer, IpcRendererEvent } from 'electron'

import { store } from '~/store'
import { IAccompanimentFilters } from '~/store/modules/accompaniments/types'
import { RootState } from '~/store/state'

import {
  OPEN_ACCOMPANIMENT_FILTERS,
  OPEN_ACCOMPANIMENT_FILTERS_DATA
} from './types'

export function openAccompanimentFilters() {
  const state = store.getState() as RootState

  ipcRenderer.send(
    OPEN_ACCOMPANIMENT_FILTERS,
    state.accompaniments.filters,
    state.auth.token
  )
}

export function useAccompanimentFilters(): [IAccompanimentFilters, string] {
  const [filters, setFilters] = useState<IAccompanimentFilters>()
  const [token, setToken] = useState<string>()

  ipcRenderer.once(
    OPEN_ACCOMPANIMENT_FILTERS_DATA,
    (_: IpcRendererEvent, data: IAccompanimentFilters, token: string) => {
      setFilters(data)
      setToken(token)
    }
  )

  return [filters, token]
}
