import React, { useContext } from 'react'

import { LoadingPanel } from '~/components/LoadingPanel'

import { HomeScreenContext } from '../../context'
import { InvoicesTable } from './InvoicesTable'
import { ScheduleRequestsTable } from './ScheduleRequestsTable'
import { SchedulesTable } from './SchedulesTable'
import {
  Wrapper,
  Container,
  ResizableWrapper,
  NestedWrapper,
  SideResizableWrapper
} from './styles'

const Content: React.VFC = () => {
  const { scheduleRequestsOfDay, isLoadingData } = useContext(HomeScreenContext)

  return (
    <>
      <Wrapper>
        <Container>
          <ResizableWrapper height={250} width={Infinity}>
            <SchedulesTable />

            <SideResizableWrapper
              hidden={scheduleRequestsOfDay.length === 0}
              height={Infinity}
              width={250}
            >
              <ScheduleRequestsTable />
            </SideResizableWrapper>
          </ResizableWrapper>

          <NestedWrapper>
            <InvoicesTable />
          </NestedWrapper>
        </Container>
      </Wrapper>

      <LoadingPanel isLoading={isLoadingData} />
    </>
  )
}

export { Content }
