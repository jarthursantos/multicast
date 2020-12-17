import React, { useContext } from 'react'

import { Pager } from '@shared/web-components'

import { InProgressScreenContext } from '~/screens/Accompaniments/InProgress/context'
import { AllSituationsPresenter } from '~/screens/Accompaniments/InProgress/SituationPresenter/AllSituations'
import { NonBilledSituationPresenter } from '~/screens/Accompaniments/InProgress/SituationPresenter/NonBilledSituation'
import { NonExpectedBillingSituationPresenter } from '~/screens/Accompaniments/InProgress/SituationPresenter/NonExpectedBillingSituation'
import { NonFreeOnBoardSituationPresenter } from '~/screens/Accompaniments/InProgress/SituationPresenter/NonFreeOnBoardSituation'
import { NonReleasedSituationPresenter } from '~/screens/Accompaniments/InProgress/SituationPresenter/NonReleasedSituation'
import { NonRevisedSituationPresenter } from '~/screens/Accompaniments/InProgress/SituationPresenter/NonRevisedSituation'
import { NonSchedulingSituationPresenter } from '~/screens/Accompaniments/InProgress/SituationPresenter/NonSchedulingSituation'
import { NonSendedSituationPresenter } from '~/screens/Accompaniments/InProgress/SituationPresenter/NonSendedSituation'
import { Wrapper } from '~/screens/Accompaniments/InProgress/SituationPresenter/Presenter/styles'
import { InProgressTabs } from '~/screens/Accompaniments/InProgress/types'

const InProgressSituationPresenter: React.FC = () => {
  const { currentSituation } = useContext(InProgressScreenContext)

  return (
    <Wrapper>
      <Pager currentPage={currentSituation}>
        <Pager.Page name={InProgressTabs.ALL}>
          <AllSituationsPresenter />
        </Pager.Page>

        <Pager.Page name={InProgressTabs.NON_SENDED}>
          <NonSendedSituationPresenter />
        </Pager.Page>

        <Pager.Page name={InProgressTabs.NON_REVISED}>
          <NonRevisedSituationPresenter />
        </Pager.Page>

        <Pager.Page name={InProgressTabs.NON_RELEASED}>
          <NonReleasedSituationPresenter />
        </Pager.Page>

        <Pager.Page name={InProgressTabs.NON_EXPECTED_BILLING}>
          <NonExpectedBillingSituationPresenter />
        </Pager.Page>

        <Pager.Page name={InProgressTabs.NON_BILLED}>
          <NonBilledSituationPresenter />
        </Pager.Page>

        <Pager.Page name={InProgressTabs.NON_FREE_ON_BOARD}>
          <NonFreeOnBoardSituationPresenter />
        </Pager.Page>

        <Pager.Page name={InProgressTabs.NON_SCHEDULING}>
          <NonSchedulingSituationPresenter />
        </Pager.Page>
      </Pager>
    </Wrapper>
  )
}

export { InProgressSituationPresenter }
