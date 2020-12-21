import { useState } from 'react'

import { ipcRenderer } from 'electron'

import { store } from '~/store'
import { ISchedule } from '~/store/modules/schedules/types'
import { RootState } from '~/store/state'

import {
  OPEN_NON_RECEIVED_SCHEDULE,
  OPEN_NON_RECEIVED_SCHEDULE_PAYLOAD
} from './types'

export function openNonReceivedScheduleWindow(schedule: ISchedule) {
  const state = store.getState() as RootState

  ipcRenderer.send(OPEN_NON_RECEIVED_SCHEDULE, schedule, state.auth.token)
}

export function useNonReceivedSchedulePayload(): [ISchedule, string] {
  const [token, setToken] = useState<string>()
  const [schedule, setSchedule] = useState<ISchedule>()

  ipcRenderer.once(
    OPEN_NON_RECEIVED_SCHEDULE_PAYLOAD,
    (_, schedule: ISchedule, token: string) => {
      setToken(token)
      setSchedule(schedule)
    }
  )

  return [schedule, token]
}
