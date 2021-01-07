import React, { useContext } from 'react'

import { Pager } from '@shared/web-components'

import { ReceivementScreenContext } from '../context'
import { InReceivementTabs } from '../types'
import { DownloadedSituationPresenter } from './DownloadedSituation'
import { NonScheduledSituationPresenter } from './NonScheduledSituation'
import { Wrapper } from './Presenter/styles'
import { ReceivingSituationPresenter } from './ReceivingSituation'
import { ScheduledSituationPresenter } from './ScheduledSituation'
import { UnlockedSituationPresenter } from './UnlockedSituation'

const ReceivementSituationPresenter: React.FC = () => {
  const { currentSituation } = useContext(ReceivementScreenContext)

  return (
    <Wrapper>
      <Pager currentPage={currentSituation}>
        <Pager.Page name={InReceivementTabs.NON_SCHEDULED}>
          <NonScheduledSituationPresenter />
        </Pager.Page>

        <Pager.Page name={InReceivementTabs.SCHEDULED}>
          <ScheduledSituationPresenter />
        </Pager.Page>

        <Pager.Page name={InReceivementTabs.RECEIVED}>
          <ReceivingSituationPresenter />
        </Pager.Page>

        <Pager.Page name={InReceivementTabs.DOWNLOADED}>
          <DownloadedSituationPresenter />
        </Pager.Page>

        <Pager.Page name={InReceivementTabs.UNLOCKED}>
          <UnlockedSituationPresenter />
        </Pager.Page>
      </Pager>
    </Wrapper>
  )
}

export { ReceivementSituationPresenter }
