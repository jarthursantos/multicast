import React, { memo, useCallback, useMemo } from 'react'
import { MdFiberManualRecord, MdStar, MdPanoramaFishEye } from 'react-icons/md'

import { format } from 'date-fns'

import { Wrapper, Container, Indicators } from './styles'

export type DayState = 'CURRENT_MONTH' | 'ANOTHER_MONTH'

export interface DayData {
  date: Date
  state: DayState
}

interface Props extends DayData {
  selected: boolean
  onClick?(): void
  havePriority?: boolean
  haveSchedules?: boolean
  haveRequest?: boolean
}

const Day: React.FC<Props> = ({
  date,
  state,
  onClick,
  selected,
  havePriority,
  haveSchedules,
  haveRequest
}) => {
  const handleClick = useCallback(() => {
    if (!selected && onClick) {
      onClick()
    }
  }, [onClick, selected])

  const isToday = useMemo(
    () => format(date, 'dd/MM/yyyy') === format(new Date(), 'dd/MM/yyyy'),
    [date]
  )

  return (
    <Wrapper onClick={handleClick} className={state} {...{ isToday, selected }}>
      <Container>
        {date.getDate()}

        {(haveRequest || havePriority || haveSchedules) && (
          <Indicators>
            {haveRequest && <MdPanoramaFishEye size={10} />}
            {!haveRequest && havePriority && <MdStar size={11} />}
            {!haveRequest && !havePriority && haveSchedules && (
              <MdFiberManualRecord size={12} />
            )}
          </Indicators>
        )}
      </Container>
    </Wrapper>
  )
}

export default memo(Day)
