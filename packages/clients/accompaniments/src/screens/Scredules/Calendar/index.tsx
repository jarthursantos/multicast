import React from 'react'

import { Gutter } from './Gutter'
import { Header } from './Header'
import { Wrapper, Container } from './styles'
import { Topic } from './Topic'

export const WORKING_HOURS = [7, 8, 9, 10, 11, 13, 14, 15, 16, 17]

const Calendar: React.FC = () => {
  return (
    <Wrapper>
      <Header />

      <Gutter />

      <Container>
        <Topic />

        <Topic />

        <Topic />
      </Container>
    </Wrapper>
  )
}

export { Calendar }
