import { useState } from 'react'

import { ipcRenderer, IpcRendererEvent } from 'electron'

import { AccompanimentFilters } from '~/store/modules/accompaniments/types'

import {
  OPEN_ACCOMPANIMENT_FILTERS,
  OPEN_ACCOMPANIMENT_FILTERS_DATA
} from './types'

export function openAccompanimentFilters(
  filters: AccompanimentFilters,
  token: string
) {
  ipcRenderer.send(OPEN_ACCOMPANIMENT_FILTERS, filters, token)
}

export function useAccompanimentFilters(): [AccompanimentFilters, string] {
  const [filters, setFilters] = useState<AccompanimentFilters>()
  const [token, setToken] = useState<string>()

  ipcRenderer.once(
    OPEN_ACCOMPANIMENT_FILTERS_DATA,
    (_: IpcRendererEvent, data: AccompanimentFilters, token: string) => {
      setFilters(data)
      setToken(token)
    }
  )

  return [filters, token]
}
