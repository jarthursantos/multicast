import React, { useContext } from 'react'

import { ScheduleCalendar } from '@shared/web-components/ScheduleCalendar'

import { Calendar } from './Calendar'
import {
  SchedulesContextProvider,
  SchedulesContext,
  useDaysWithSchedule
} from './context'
import { Wrapper, Container } from './styles'

const ScredulesScreenComponent: React.FC = () => {
  const daysWithSchedules = useDaysWithSchedule()

  const { selectedDate, setSelectedDate } = useContext(SchedulesContext)

  return (
    <Wrapper>
      <Container>
        <ScheduleCalendar
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          daysWithSchedules={daysWithSchedules}
        />
      </Container>

      <Calendar />
    </Wrapper>
  )
}

const ScredulesScreen: React.FC = () => {
  return (
    <SchedulesContextProvider>
      <ScredulesScreenComponent />
    </SchedulesContextProvider>
  )
}

export { ScredulesScreen }
