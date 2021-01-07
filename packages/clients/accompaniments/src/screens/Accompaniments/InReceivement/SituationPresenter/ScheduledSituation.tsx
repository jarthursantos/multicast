import React from 'react'

import { useScheduledAccompaniments } from '~/store/context'

import { InReceivementTabs } from '../types'
import { scheduledColumns } from './columns'
import { Presenter } from './Presenter'

const ScheduledSituationPresenter: React.VFC = () => {
  const accompaniments = useScheduledAccompaniments()

  return (
    <Presenter
      data={accompaniments}
      columns={scheduledColumns}
      tab={InReceivementTabs.SCHEDULED}
    />
  )
}

export { ScheduledSituationPresenter }
