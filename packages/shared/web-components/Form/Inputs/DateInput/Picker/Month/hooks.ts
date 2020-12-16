import { useMemo } from 'react'

import {
  addDays,
  setDate,
  subDays,
  getWeek,
  startOfMonth,
  endOfMonth
} from 'date-fns'

import { DayData } from './Day'

export function useFirstDay(month: Date) {
  const firstDay = useMemo(() => {
    const day = startOfMonth(month)

    return day
  }, [month])

  return firstDay
}

export function useLastDay(month: Date) {
  const lastDay = useMemo(() => {
    const day = endOfMonth(month)

    return day
  }, [month])

  return lastDay
}

export function useDaysFromWeek(month: Date) {
  const firstDay = useFirstDay(month)
  const lastDay = useLastDay(month)

  const weeks: DayData[][] = []

  let currentDate = setDate(month, 1)
  let lastWeekNumber = getWeek(firstDay)
  let lastWeekAdded = 0

  let currentWeek: DayData[] = []

  for (let i = 1; i <= firstDay.getDay(); i++) {
    currentWeek.unshift({
      date: subDays(currentDate, i),
      state: 'ANOTHER_MONTH'
    })
  }

  for (let i = 1; i <= lastDay.getDate(); i++) {
    const weekNumber = getWeek(currentDate)

    if (lastWeekNumber !== weekNumber) {
      lastWeekAdded = lastWeekNumber

      weeks.push(currentWeek)
      lastWeekNumber = weekNumber

      currentWeek = []
    }

    currentWeek.push({
      date: currentDate,
      state: 'CURRENT_MONTH'
    })

    currentDate = addDays(currentDate, 1)

    if (i === lastDay.getDate() && lastWeekAdded !== getWeek(currentDate)) {
      while (currentWeek.length < 7) {
        currentWeek.push({
          date: currentDate,
          state: 'ANOTHER_MONTH'
        })

        currentDate = addDays(currentDate, 1)
      }

      weeks.push(currentWeek)
    }
  }

  if (weeks.length < 6) {
    currentWeek = []

    for (let i = 0; i < 7; i++) {
      currentWeek.push({
        date: currentDate,
        state: 'ANOTHER_MONTH'
      })

      currentDate = addDays(currentDate, 1)
    }

    weeks.push(currentWeek)
  }

  return weeks
}
