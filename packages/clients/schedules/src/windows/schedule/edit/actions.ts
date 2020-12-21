import { useState } from 'react'

import { ipcRenderer } from 'electron'

import { store } from '~/store'
import { ISchedule } from '~/store/modules/schedules/types'
import { RootState } from '~/store/state'

import {
  OPEN_EDIT_CLOSED_SCHEDULE,
  OPEN_EDIT_CLOSED_SCHEDULE_PAYLOAD,
  OPEN_EDIT_OPENED_SCHEDULE,
  OPEN_EDIT_OPENED_SCHEDULE_PAYLOAD
} from './types'

export function openEditOpenedScheduleWindow(schedule: ISchedule) {
  const state = store.getState() as RootState

  ipcRenderer.send(OPEN_EDIT_OPENED_SCHEDULE, schedule, state.auth.token)
}

export function useEditOpenedSchedulePayload(): [ISchedule, string] {
  const [token, setToken] = useState<string>()
  const [schedule, setSchedule] = useState<ISchedule>()

  ipcRenderer.once(
    OPEN_EDIT_OPENED_SCHEDULE_PAYLOAD,
    (_, schedule: ISchedule, token: string) => {
      setToken(token)
      setSchedule(schedule)
    }
  )

  return [schedule, token]
}

export function openEditClosedScheduleWindow(schedule: ISchedule) {
  const state = store.getState() as RootState

  ipcRenderer.send(OPEN_EDIT_CLOSED_SCHEDULE, schedule, state.auth.token)
}

export function useEditClosedSchedulePayload(): [ISchedule, string] {
  const [token, setToken] = useState<string>()
  const [schedule, setSchedule] = useState<ISchedule>()

  ipcRenderer.once(
    OPEN_EDIT_CLOSED_SCHEDULE_PAYLOAD,
    (_, schedule: ISchedule, token: string) => {
      setToken(token)
      setSchedule(schedule)
    }
  )

  return [schedule, token]
}
