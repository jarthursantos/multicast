import React from 'react'

import { getHours, getMinutes, format } from 'date-fns'

import { Container } from './styles'
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
      <div>{formatHour(event.startHour, event.endHour)}</div>

      {event.labels.map(label => (
        <div key={label}>{label}</div>
      ))}
    </Container>
  )
}

export { Event }
