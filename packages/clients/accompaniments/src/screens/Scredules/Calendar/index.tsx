import React from 'react'

import { Gutter } from './Gutter'
import { Wrapper, Container } from './styles'
import { Topic } from './Topic'

export const WORKING_HOURS = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]

export const INITIAL_HOUR = WORKING_HOURS[0]
export const FINAL_HOUR = WORKING_HOURS[WORKING_HOURS.length - 1]
export const HOUR_PERCENT = 100 / WORKING_HOURS.length
export const HALF_OF_HOUR_PERCENT = HOUR_PERCENT / 2

const Calendar: React.FC = () => {
  return (
    <Wrapper>
      <Gutter />

      <Container>
        <Topic
          title="PAULO ALEXANDRE REIS"
          events={[
            {
              id: '1',
              startHour: new Date(0, 0, 0, 10, 30),
              endHour: new Date(0, 0, 0, 17, 30)
            },
            {
              id: '2',
              startHour: new Date(0, 0, 0, 7, 30),
              endHour: new Date(0, 0, 0, 10, 30)
            }
          ]}
        />

        <Topic
          title="ALEXANDRE MAGNO"
          events={[
            {
              id: '1',
              startHour: new Date(0, 0, 0, 12, 0),
              endHour: new Date(0, 0, 0, 15, 0)
            }
          ]}
        />
      </Container>
    </Wrapper>
  )
}

export { Calendar }
