import React from 'react'

import { useUnlockedAccompaniments } from '~/store/context'

import { InReceivementTabs } from '../types'
import { unlockedColumns } from './columns'
import { Presenter } from './Presenter'

const UnlockedSituationPresenter: React.VFC = () => {
  const accompaniments = useUnlockedAccompaniments()

  return (
    <Presenter
      data={accompaniments}
      columns={unlockedColumns}
      tab={InReceivementTabs.UNLOCKED}
    />
  )
}

export { UnlockedSituationPresenter }
