import { useState } from 'react'

import { ipcRenderer } from 'electron'

import { store } from '~/store'
import { RootState } from '~/store/state'

import { OPEN_REGISTER_SCHEDULE, OPEN_REGISTER_SCHEDULE_PAYLOAD } from './types'

export function openCreateScheduleWindow() {
  const state = store.getState() as RootState

  ipcRenderer.send(OPEN_REGISTER_SCHEDULE, state.auth.token)
}

export function useCreateSchedulePayload() {
  const [token, setToken] = useState<string>()

  ipcRenderer.once(OPEN_REGISTER_SCHEDULE_PAYLOAD, (_, payload: string) => {
    setToken(payload)
  })

  return token
}
