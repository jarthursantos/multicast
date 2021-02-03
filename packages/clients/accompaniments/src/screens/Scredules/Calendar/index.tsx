import React, { useMemo } from 'react'

import { normalizeDate, useAgendaOfDay } from '../context'
import { Gutter } from './Gutter'
import { Wrapper, Container } from './styles'
import { Topic } from './Topic'
import { BuyerTopic } from './types'

export const WORKING_HOURS = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]

export const INITIAL_HOUR = WORKING_HOURS[0]
export const FINAL_HOUR = WORKING_HOURS[WORKING_HOURS.length - 1]
export const HOUR_PERCENT = 100 / WORKING_HOURS.length
export const HALF_OF_HOUR_PERCENT = HOUR_PERCENT / 2

const Calendar: React.FC = () => {
  const agenda = useAgendaOfDay()

  const topics = useMemo(() => {
    return agenda.reduce<BuyerTopic[]>((currentTopics, { buyer, ...rest }) => {
      let buyerTopic = currentTopics.find(
        curr => curr.buyer.code === buyer.code
      )

      if (!buyerTopic) {
        buyerTopic = { buyer, events: [] }

        currentTopics.push(buyerTopic)
      }

      buyerTopic.events.push(rest)

      return currentTopics
    }, [])
  }, [agenda])

  return (
    <Wrapper>
      <Gutter />

      <Container>
        {topics.map(({ buyer, events }) => (
          <Topic
            key={buyer.code}
            title={buyer.name}
            events={events.map(({ id, date, providers }) => ({
              id,
              startHour: normalizeDate(date.from),
              endHour: normalizeDate(date.to),
              labels: providers.map(({ name }) => name)
            }))}
          />
        ))}

        <Topic title={''} events={[]} fill />
      </Container>
    </Wrapper>
  )
}

export { Calendar }
