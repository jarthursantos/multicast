import { useState } from 'react'

import { ipcRenderer, IpcRendererEvent } from 'electron'

import { store } from '~/store'
import { Accompaniment } from '~/store/modules/accompaniments/types'
import { RootState } from '~/store/state'

import {
  OPEN_ACCOMPANIMENT_DETAILS,
  OPEN_ACCOMPANIMENT_DETAILS_DATA
} from './types'

export function openAccompanimentDetails(accompaniment: Accompaniment) {
  const state = store.getState() as RootState

  ipcRenderer.send(OPEN_ACCOMPANIMENT_DETAILS, accompaniment, state.auth.token)
}

export function useAccompanimentDetailsPayload(): [Accompaniment, string] {
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
