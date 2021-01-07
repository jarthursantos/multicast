import React from 'react'

import { useReceivingAccompaniments } from '~/store/context'

import { InReceivementTabs } from '../types'
import { receivingColumns } from './columns'
import { Presenter } from './Presenter'

const ReceivingSituationPresenter: React.VFC = () => {
  const accompaniments = useReceivingAccompaniments()

  return (
    <Presenter
      data={accompaniments}
      columns={receivingColumns}
      tab={InReceivementTabs.RECEIVED}
    />
  )
}

export { ReceivingSituationPresenter }
