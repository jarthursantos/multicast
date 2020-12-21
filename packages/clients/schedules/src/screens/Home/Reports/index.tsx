import React, { useContext } from 'react'

import { Pager } from '@shared/web-components'

import { HomeScreenContext } from '~/screens/Home/context'
import { ReportsTabs } from '~/screens/Home/types'

import { DischargeValueReport } from './DischargeValue'
import { PendingProccessReport } from './PendingProccess'

const ReportsScreen: React.VFC = () => {
  const { currentReportTab } = useContext(HomeScreenContext)

  return (
    <Pager currentPage={currentReportTab}>
      <Pager.Page name={ReportsTabs.DISCHARGE_VALUE}>
        <DischargeValueReport />
      </Pager.Page>

      <Pager.Page name={ReportsTabs.PENDING_PROCCESS}>
        <PendingProccessReport />
      </Pager.Page>
    </Pager>
  )
}

export { ReportsScreen }
