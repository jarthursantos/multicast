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
    state.accompaniments.includeCanceledAccompaniments,
    state.accompaniments.includeCompletedAccompaniments,
    state.auth.token
  )
}

export function useAccompanimentFilters(): [
  IAccompanimentFilters,
  boolean,
  boolean,
  string
] {
  const [filters, setFilters] = useState<IAccompanimentFilters>()
  const [
    includeCanceledAccompaniments,
    setIncludeCanceledAccompaniments
  ] = useState(false)
  const [
    includeCompletedAccompaniments,
    setIncludeCompletedAccompaniments
  ] = useState(false)
  const [token, setToken] = useState<string>()

  ipcRenderer.once(
    OPEN_ACCOMPANIMENT_FILTERS_DATA,
    (
      _: IpcRendererEvent,
      data: IAccompanimentFilters,
      includeCanceledAccompaniments: boolean,
      includeCompletedAccompaniments: boolean,
      token: string
    ) => {
      setFilters(data)
      setIncludeCanceledAccompaniments(includeCanceledAccompaniments)
      setIncludeCompletedAccompaniments(includeCompletedAccompaniments)
      setToken(token)
    }
  )

  return [
    filters,
    includeCanceledAccompaniments,
    includeCompletedAccompaniments,
    token
  ]
}
