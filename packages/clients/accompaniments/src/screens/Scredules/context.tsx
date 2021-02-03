import React, { createContext, useContext, useState } from 'react'

import { isSameDay, parseISO } from 'date-fns'

import { IDayWithSchedule } from '@shared/web-components/ScheduleCalendar/types'

import { useTypedSelector } from '~/store'

import { SchedulesContextHandles } from './types'

export const SchedulesContext = createContext<SchedulesContextHandles>(
  undefined
)

export const SchedulesContextProvider: React.FC = ({ children }) => {
  const { agenda } = useTypedSelector(state => state.agenda)

  const [selectedDate, setSelectedDate] = useState(new Date())

  return (
    <SchedulesContext.Provider
      value={{ agenda, selectedDate, setSelectedDate }}
    >
      {children}
    </SchedulesContext.Provider>
  )
}

export function useAgendaOfDay() {
  const { agenda, selectedDate } = useContext(SchedulesContext)

  return agenda.filter(({ date }) =>
    isSameDay(normalizeDate(date.from), normalizeDate(selectedDate))
  )
}

export function useDaysWithSchedule(): IDayWithSchedule[] {
  const { agenda } = useContext(SchedulesContext)

  const scheduledDates = agenda.reduce<Date[]>((dates, { date }) => {
    const from = normalizeDate(date.from)

    const dateAlreadyAdded = dates.find(curr =>
      isSameDay(normalizeDate(curr), from)
    )

    if (dateAlreadyAdded) {
      return dates
    }

    dates.push(from)

    return dates
  }, [])

  return scheduledDates.map(date => ({ date, state: 'normal' }))
}

export function normalizeDate(date: string | Date): Date {
  return typeof date === 'string' ? parseISO(date) : date
}
