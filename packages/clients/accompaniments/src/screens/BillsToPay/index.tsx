import React, { useContext } from 'react'

import { LoadingPanel } from '@shared/web-components'
import { ScheduleCalendar } from '@shared/web-components/ScheduleCalendar'

import { useTypedSelector } from '~/store'

import {
  SchedulesContextProvider,
  SchedulesContext,
  useDaysWithSchedule
} from './context'
import { PendingBills } from './PendingBills'
import { Wrapper, Container } from './styles'

const BillsToPayScreenComponent: React.FC = () => {
  const daysWithSchedules = useDaysWithSchedule()

  const { loading } = useTypedSelector(state => state.billsToPay)
  const { selectedDate, setSelectedDate } = useContext(SchedulesContext)

  return (
    <React.Fragment>
      <Wrapper>
        <Container>
          <ScheduleCalendar
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            daysWithSchedules={daysWithSchedules}
          />
        </Container>

        <PendingBills />
      </Wrapper>

      <LoadingPanel isLoading={loading} />
    </React.Fragment>
  )
}

const BillsToPayScreen: React.FC = () => {
  return (
    <SchedulesContextProvider>
      <BillsToPayScreenComponent />
    </SchedulesContextProvider>
  )
}

export { BillsToPayScreen }
