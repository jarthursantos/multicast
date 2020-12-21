import { useState } from 'react'

import { ipcRenderer } from 'electron'

import { store } from '~/store'
import { ISchedule } from '~/store/modules/schedules/types'
import { RootState } from '~/store/state'

import { OPEN_RECEIVE_SCHEDULE, OPEN_RECEIVE_SCHEDULE_PAYLOAD } from './types'

export function openReceiveScheduleWindow(schedule: ISchedule) {
  const state = store.getState() as RootState

  ipcRenderer.send(OPEN_RECEIVE_SCHEDULE, schedule, state.auth.token)
}

export function useReceiveSchedulePayload(): [ISchedule, string] {
  const [token, setToken] = useState<string>()
  const [schedule, setSchedule] = useState<ISchedule>()

  ipcRenderer.once(
    OPEN_RECEIVE_SCHEDULE_PAYLOAD,
    (_, schedule: ISchedule, token: string) => {
      setToken(token)
      setSchedule(schedule)
    }
  )

  return [schedule, token]
}
