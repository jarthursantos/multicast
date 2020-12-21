import { useState } from 'react'

import { ipcRenderer } from 'electron'

import { store } from '~/store'
import { ISchedule } from '~/store/modules/schedules/types'
import { RootState } from '~/store/state'

import { OPEN_STOPPED_SCHEDULE, OPEN_STOPPED_SCHEDULE_PAYLOAD } from './types'

export function openStoppedScheduleWindow(schedule: ISchedule) {
  const state = store.getState() as RootState

  ipcRenderer.send(OPEN_STOPPED_SCHEDULE, schedule, state.auth.token)
}

export function useStoppedSchedulePayload(): [ISchedule, string] {
  const [token, setToken] = useState<string>()
  const [schedule, setSchedule] = useState<ISchedule>()

  ipcRenderer.once(
    OPEN_STOPPED_SCHEDULE_PAYLOAD,
    (_, schedule: ISchedule, token: string) => {
      setToken(token)
      setSchedule(schedule)
    }
  )

  return [schedule, token]
}
