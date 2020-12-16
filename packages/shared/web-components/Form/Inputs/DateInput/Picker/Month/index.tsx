import React, { Dispatch, SetStateAction } from 'react'

import { format } from 'date-fns'

import Day from './Day'
import { useDaysFromWeek } from './hooks'
import { Container, Row, Letter } from './styles'

interface Props {
  month: Date
  selection: Date
  onSelectionChange: Dispatch<SetStateAction<Date>>
}

const Month: React.FC<Props> = ({ month, selection, onSelectionChange }) => {
  const weeks = useDaysFromWeek(month)

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
              date={day.date}
              state={day.state}
              key={`${weekIndex}.${dayIndex}`}
              onClick={() => onSelectionChange(day.date)}
              selected={
                selection
                  ? format(day.date, 'dd/MM/yyyy') ===
                    format(selection, 'dd/MM/yyyy')
                  : false
              }
            />
          ))}
        </Row>
      ))}
    </Container>
  )
}

export default Month
