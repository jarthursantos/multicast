import React, { useCallback, useState, useEffect, useContext } from 'react'

import { addMonths, subMonths, format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { HomeScreenContext } from '../../context'
import Header from './Header'
import Legend from './Legend'
import Month from './Month'
import { Wrapper, SelectionContainer } from './styles'

export interface IDayWithSchedule {
  date: Date
  state: 'normal' | 'priority' | 'request'
}

const DatePicker: React.VFC = () => {
  const { selectedDate, setSelectedDate, daysWithSchedules } = useContext(
    HomeScreenContext
  )

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

      <Legend />
    </Wrapper>
  )
}

export { DatePicker }
