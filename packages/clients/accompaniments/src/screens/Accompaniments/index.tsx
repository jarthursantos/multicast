import React, { useCallback, useContext, useRef } from 'react'

import { LoadingPanel } from '@shared/web-components'
import { Pager } from '@shared/web-components/Pager'

import { AccompanimentsCanceled } from '~/screens/Accompaniments/Canceled'
import { AccompanimentsCompleted } from '~/screens/Accompaniments/Completed'
import { AccompanimentsGeneralResume } from '~/screens/Accompaniments/GeneralResume'
import { AccompanimentsInProgress } from '~/screens/Accompaniments/InProgress'
import { AccompanimentsInReceivement } from '~/screens/Accompaniments/InReceivement'
import { HomeScreenContext } from '~/screens/context'
import { AccompanimentTabs } from '~/screens/types'

import {
  AccompanimentsInProgressComponentHandles,
  InProgressTabs
} from './InProgress/types'

const AccompanimentsScreen: React.FC = () => {
  const inProgressRef = useRef<AccompanimentsInProgressComponentHandles>(null)

  const { currentAccompanimentTab, isLoading } = useContext(HomeScreenContext)

  const handleChangeCurrentInProgress = useCallback(
    (tab: InProgressTabs) => {
      inProgressRef.current?.changeCurrentTab(tab)
    },
    [inProgressRef]
  )

  return (
    <React.Fragment>
      <Pager currentPage={currentAccompanimentTab}>
        <Pager.Page name={AccompanimentTabs.GENERAL_RESUME}>
          <AccompanimentsGeneralResume
            changeCurrentInProgressTab={handleChangeCurrentInProgress}
          />
        </Pager.Page>

        <Pager.Page name={AccompanimentTabs.IN_PROGRESS}>
          <AccompanimentsInProgress ref={inProgressRef} />
        </Pager.Page>

        <Pager.Page name={AccompanimentTabs.IN_RECEIVEMENT}>
          <AccompanimentsInReceivement />
        </Pager.Page>

        <Pager.Page name={AccompanimentTabs.CENCELED}>
          <AccompanimentsCanceled />
        </Pager.Page>

        <Pager.Page name={AccompanimentTabs.COMPLETED}>
          <AccompanimentsCompleted />
        </Pager.Page>
      </Pager>

      <LoadingPanel isLoading={isLoading} />
    </React.Fragment>
  )
}

export { AccompanimentsScreen }
