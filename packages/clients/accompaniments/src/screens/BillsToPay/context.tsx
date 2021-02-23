import React, { createContext, useContext, useState } from 'react'

import { isSameDay, parseISO } from 'date-fns'

import { IDayWithSchedule } from '@shared/web-components/ScheduleCalendar/types'

import { useTypedSelector } from '~/store'

import { SchedulesContextHandles } from './types'

export const SchedulesContext = createContext<SchedulesContextHandles>(
  undefined
)

export const SchedulesContextProvider: React.FC = ({ children }) => {
  const { billsToPay } = useTypedSelector(state => state.billsToPay)

  const [selectedDate, setSelectedDate] = useState(new Date())

  return (
    <SchedulesContext.Provider
      value={{ billsToPay, selectedDate, setSelectedDate }}
    >
      {children}
    </SchedulesContext.Provider>
  )
}

export function useBillsToPayOfDay() {
  const { billsToPay, selectedDate } = useContext(SchedulesContext)

  return billsToPay.filter(({ dueDate }) =>
    isSameDay(normalizeDate(dueDate), normalizeDate(selectedDate))
  )
}

export function useDaysWithSchedule(): IDayWithSchedule[] {
  const { billsToPay } = useContext(SchedulesContext)

  const scheduledDates = billsToPay.reduce<Date[]>((dates, { dueDate }) => {
    const date = normalizeDate(dueDate)

    const dateAlreadyAdded = dates.find(curr =>
      isSameDay(normalizeDate(curr), date)
    )

    if (dateAlreadyAdded) {
      return dates
    }

    dates.push(date)

    return dates
  }, [])

  return scheduledDates.map(date => ({ date, state: 'normal' }))
}

export function normalizeDate(date: string | Date): Date {
  return typeof date === 'string' ? parseISO(date) : date
}
