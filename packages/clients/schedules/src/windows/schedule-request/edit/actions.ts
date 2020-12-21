import { useState } from 'react'

import { ipcRenderer } from 'electron'

import { store } from '~/store'
import { IScheduleRequest } from '~/store/modules/schedule-requests/types'
import { RootState } from '~/store/state'

import {
  OPEN_EDIT_SCHEDULE_REQUEST,
  OPEN_EDIT_SCHEDULE_REQUEST_PAYLOAD
} from './types'

export function openEditScheduleRequestWindow(
  scheduleRequest: IScheduleRequest
) {
  const state = store.getState() as RootState

  ipcRenderer.send(
    OPEN_EDIT_SCHEDULE_REQUEST,
    scheduleRequest,
    state.auth.token
  )
}

export function useEditScheduleRequestPayload(): [IScheduleRequest, string] {
  const [token, setToken] = useState<string>()
  const [scheduleRequest, setScheduleRequest] = useState<IScheduleRequest>()

  ipcRenderer.once(
    OPEN_EDIT_SCHEDULE_REQUEST_PAYLOAD,
    (_, scheduleRequest: IScheduleRequest, token: string) => {
      setToken(token)
      setScheduleRequest(scheduleRequest)
    }
  )

  return [scheduleRequest, token]
}
