import React from 'react'

import { WORKING_HOURS } from '../index'
import { Container } from './styles'
import { TimeSlot } from './TimeSlot'

const Gutter: React.VFC = () => {
  return (
    <Container>
      {WORKING_HOURS.map(hour => (
        <TimeSlot key={hour} time={hour} />
      ))}
    </Container>
  )
}

export { Gutter }
