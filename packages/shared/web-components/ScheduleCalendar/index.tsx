import React, { useCallback, useState, useEffect } from 'react'

import { addMonths, subMonths, format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import Header from './Header'
import Month from './Month'
import { Wrapper, SelectionContainer } from './styles'
import { IScheduleCalendarProps } from './types'

const ScheduleCalendar: React.VFC<IScheduleCalendarProps> = ({
  selectedDate,
  setSelectedDate,
  daysWithSchedules
}) => {
  const [month, setMonth] = useState(new Date())

  const handlePreviousMonth = useCallback(() => {
    setMonth(oldMonth => subMonths(oldMonth, 1))
  }, [])

  const handleNextMonth = useCallback(() => {
    setMonth(oldMonth => addMonths(oldMonth, 1))
  }, [])

  useEffect(() => {
    setMonth(currentMonth =>
      selectedDate.getMonth() !== currentMonth.getMonth()
        ? selectedDate
        : currentMonth
    )
  }, [selectedDate])

  return (
    <Wrapper>
      <SelectionContainer>
        <small>Agendamentos do dia</small>
        <strong>
          {format(selectedDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
        </strong>
      </SelectionContainer>

      <Header
        month={month}
        onNext={handleNextMonth}
        onPrevious={handlePreviousMonth}
      />

      <Month
        month={month}
        selection={selectedDate}
        onSelectionChange={setSelectedDate}
        daysWithSchedules={daysWithSchedules}
      />
    </Wrapper>
  )
}

export { ScheduleCalendar }
