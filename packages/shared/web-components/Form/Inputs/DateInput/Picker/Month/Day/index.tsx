import React, { useCallback } from 'react'

import { format } from 'date-fns'

import { Wrapper } from './styles'

export type DayState = 'CURRENT_MONTH' | 'ANOTHER_MONTH'

export interface DayData {
  date: Date
  state: DayState
}

interface Props extends DayData {
  selected: boolean
  onClick?(): void
}

const Day: React.FC<Props> = ({ date, state, onClick, selected }) => {
  const handleClick = useCallback(() => {
    if (!selected && onClick) {
      onClick()
    }
  }, [onClick, selected])

  return (
    <Wrapper
      onClick={handleClick}
      className={state}
      selected={selected}
      isToday={format(date, 'dd/MM/yyyy') === format(new Date(), 'dd/MM/yyyy')}
    >
      {date.getDate()}
    </Wrapper>
  )
}

export default Day
