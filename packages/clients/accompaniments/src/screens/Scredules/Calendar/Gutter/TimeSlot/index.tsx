import React from 'react'

import { Wrapper } from './styles'
import { ITimeSlotProps } from './types'

function normalizeHour(hour: number): string {
  if (hour < 10) {
    return `0${hour}`
  }

  return `${hour}`
}

const TimeSlot: React.VFC<ITimeSlotProps> = ({ time }) => {
  return <Wrapper>{normalizeHour(time)}:00</Wrapper>
}

export { TimeSlot }
