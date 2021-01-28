import React, { Dispatch, memo, SetStateAction, useCallback } from 'react'

import { format } from 'date-fns'

import { IDayWithSchedule } from '../types'
import Day from './Day'
import { useDaysFromWeek } from './hooks'
import { Container, Row, Letter } from './styles'

interface Props {
  month: Date
  selection: Date
  onSelectionChange: Dispatch<SetStateAction<Date>>
  daysWithSchedules: IDayWithSchedule[]
}

const Month: React.FC<Props> = ({
  month,
  selection,
  onSelectionChange,
  daysWithSchedules
}) => {
  const weeks = useDaysFromWeek(month)

  const haveSchedule = useCallback(
    (day: Date) => {
      const count = daysWithSchedules.filter(
        ({ date }) => format(day, 'dd/MM/yyyy') === format(date, 'dd/MM/yyyy')
      )

      return count.length !== 0
    },
    [daysWithSchedules]
  )

  const havePriority = useCallback(
    (day: Date) => {
      const count = daysWithSchedules.filter(
        ({ date }) => format(day, 'dd/MM/yyyy') === format(date, 'dd/MM/yyyy')
      )

      const priorities = count.filter(({ state }) => state === 'priority')

      return priorities.length !== 0
    },
    [daysWithSchedules]
  )

  const haveRequest = useCallback(
    (day: Date) => {
      const count = daysWithSchedules.filter(
        ({ date }) => format(day, 'dd/MM/yyyy') === format(date, 'dd/MM/yyyy')
      )

      const priorities = count.filter(({ state }) => state === 'request')

      return priorities.length !== 0
    },
    [daysWithSchedules]
  )

  return (
    <Container>
      <Row>
        <Letter>D</Letter>
        <Letter>S</Letter>
        <Letter>T</Letter>
        <Letter>Q</Letter>
        <Letter>Q</Letter>
        <Letter>S</Letter>
        <Letter>S</Letter>
      </Row>

      {weeks.map((week, weekIndex) => (
        <Row key={weekIndex}>
          {week.map((day, dayIndex) => (
            <Day
              {...day}
              key={`${weekIndex}.${dayIndex}`}
              haveRequest={haveRequest(day.date)}
              havePriority={havePriority(day.date)}
              haveSchedules={haveSchedule(day.date)}
              onClick={() => onSelectionChange(day.date)}
              selected={
                format(day.date, 'dd/MM/yyyy') ===
                format(selection, 'dd/MM/yyyy')
              }
            />
          ))}
        </Row>
      ))}
    </Container>
  )
}

export default memo(Month)
