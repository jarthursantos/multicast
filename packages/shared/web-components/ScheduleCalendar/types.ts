import { Dispatch, SetStateAction } from 'react'

export interface IScheduleCalendarProps {
  selectedDate: Date
  setSelectedDate: Dispatch<SetStateAction<Date>>
  daysWithSchedules: IDayWithSchedule[]
}

export interface IDayWithSchedule {
  date: Date
  state: 'normal' | 'priority' | 'request'
}
