import { useState } from 'react'

import { ipcRenderer } from 'electron'

import { store } from '~/store'
import { RootState } from '~/store/state'

import {
  OPEN_CREATE_SCHEDULE_REQUEST,
  OPEN_CREATE_SCHEDULE_REQUEST_PAYLOAD
} from './types'

export function openCreateScheduleRequestWindow() {
  const state = store.getState() as RootState

  ipcRenderer.send(OPEN_CREATE_SCHEDULE_REQUEST, state.auth.token)
}

export function useCreateScheduleRequestPayload() {
  const [token, setToken] = useState<string>()

  ipcRenderer.once(
    OPEN_CREATE_SCHEDULE_REQUEST_PAYLOAD,
    (_, payload: string) => {
      setToken(payload)
    }
  )

  return token
}
