import styled from 'styled-components'

import {
  HOUR_PERCENT,
  INITIAL_HOUR,
  FINAL_HOUR,
  HALF_OF_HOUR_PERCENT
} from '../../index'

interface IContainerProps {
  startHour: number
  startMinute: number
  endHour: number
  endMinute: number
}

function calcTopPercent(hours: number, minutes: number) {
  const isHalfHour = minutes !== 0

  return (
    (hours - INITIAL_HOUR) * HOUR_PERCENT +
    (isHalfHour ? HALF_OF_HOUR_PERCENT : 0)
  ).toFixed(2)
}

function calcBottomPercent(hours: number, minutes: number) {
  const isHalfHour = minutes !== 0

  return (
    (FINAL_HOUR + 1 - hours) * HOUR_PERCENT -
    (isHalfHour ? HALF_OF_HOUR_PERCENT : 0)
  ).toFixed(2)
}

export const Container = styled.div<IContainerProps>`
  position: absolute;
  left: 0;
  right: 0;
  top: ${({ startHour, startMinute }) =>
    `${calcTopPercent(startHour, startMinute)}%`};
  bottom: ${({ endHour, endMinute }) =>
    `${calcBottomPercent(endHour, endMinute)}%`};
  margin: 2px 4px;
  border: none !important;
  border-radius: 4px;
  color: white;
  padding: 8px;
  background-color: rgba(255, 0, 0, 0.8);
`
