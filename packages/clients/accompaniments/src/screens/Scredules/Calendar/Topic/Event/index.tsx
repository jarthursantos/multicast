import React from 'react'

import { getHours, getMinutes, format } from 'date-fns'

import { Container, Line, Hour } from './styles'
import { IEventProps } from './types'

function formatHour(start: Date, end: Date) {
  return `${format(start, 'hh:mm')} - ${format(end, 'hh:mm')}`
}

const Event: React.VFC<IEventProps> = ({ data: event }) => {
  return (
    <Container
      startHour={getHours(event.startHour)}
      startMinute={getMinutes(event.startHour)}
      endHour={getHours(event.endHour)}
      endMinute={getMinutes(event.endHour)}
    >
      <Hour>{formatHour(event.startHour, event.endHour)}</Hour>

      {event.labels.map(label => (
        <Line key={label}>{label}</Line>
      ))}
    </Container>
  )
}

export { Event }
