import React from 'react'

import { WORKING_HOURS } from '../index'
import { Event } from './Event'
import { Header } from './Header'
import { Hour } from './Hour'
import { Wrapper, Container } from './styles'
import { ITopicProps } from './types'

const Topic: React.VFC<ITopicProps> = ({ title, events, fill }) => {
  return (
    <Wrapper fill={fill}>
      <Header title={title} />

      <Container>
        {WORKING_HOURS.map(hour => (
          <Hour key={hour} />
        ))}

        {events.map(event => (
          <Event key={event.id} data={event} />
        ))}
      </Container>
    </Wrapper>
  )
}

export { Topic }
