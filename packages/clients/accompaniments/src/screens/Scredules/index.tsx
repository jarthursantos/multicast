import React, { useState } from 'react'

import { ScheduleCalendar } from '@shared/web-components/ScheduleCalendar'

import { Calendar } from './Calendar'
import { Wrapper, Container } from './styles'

const ScredulesScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())

  return (
    <Wrapper>
      <Container>
        <ScheduleCalendar
          daysWithSchedules={[]}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </Container>

      <Calendar />
    </Wrapper>
  )
}

export { ScredulesScreen }
