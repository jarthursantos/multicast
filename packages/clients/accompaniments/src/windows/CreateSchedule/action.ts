import { useState } from 'react'

import { ipcRenderer, IpcRendererEvent } from 'electron'

import { store } from '~/store'
import { RootState } from '~/store/state'

import { OPEN_CREATE_SCHEDULE, OPEN_CREATE_SCHEDULE_DATA } from './types'

export function openCreateSchedule() {
  const state = store.getState() as RootState

  ipcRenderer.send(OPEN_CREATE_SCHEDULE, state.auth.token)
}

export function useCreateSchedule(): string {
  const [token, setToken] = useState<string>()

  ipcRenderer.once(
    OPEN_CREATE_SCHEDULE_DATA,
    (_: IpcRendererEvent, token: string) => {
      setToken(token)
    }
  )

  return token
}
