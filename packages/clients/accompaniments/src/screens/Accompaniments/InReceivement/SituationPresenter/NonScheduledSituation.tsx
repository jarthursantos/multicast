import React from 'react'

import { useNonScheduledAccompaniments } from '~/store/context'

import { InReceivementTabs } from '../types'
import { nonScheduledColumns } from './columns'
import { Presenter } from './Presenter'

const NonScheduledSituationPresenter: React.VFC = () => {
  const accompaniments = useNonScheduledAccompaniments()

  return (
    <Presenter
      data={accompaniments}
      columns={nonScheduledColumns}
      tab={InReceivementTabs.NON_SCHEDULED}
    />
  )
}

export { NonScheduledSituationPresenter }
