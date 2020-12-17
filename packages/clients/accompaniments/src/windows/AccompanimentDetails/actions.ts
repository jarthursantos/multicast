import { useState } from 'react'

import { ipcRenderer, IpcRendererEvent } from 'electron'

import { Accompaniment } from '~/store/modules/accompaniments/types'

import {
  OPEN_ACCOMPANIMENT_DETAILS,
  OPEN_ACCOMPANIMENT_DETAILS_DATA
} from './types'

export function openAccompanimentDetails(
  accompaniment: Accompaniment,
  token: string
) {
  ipcRenderer.send(OPEN_ACCOMPANIMENT_DETAILS, accompaniment, token)
}

export function useAccompanimentDetails(): [Accompaniment, string] {
  const [accompaniment, setAccompaniment] = useState<Accompaniment>()
  const [token, setToken] = useState<string>()

  ipcRenderer.once(
    OPEN_ACCOMPANIMENT_DETAILS_DATA,
    (_: IpcRendererEvent, data: Accompaniment, token: string) => {
      setAccompaniment(data)
      setToken(token)
    }
  )

  return [accompaniment, token]
}
