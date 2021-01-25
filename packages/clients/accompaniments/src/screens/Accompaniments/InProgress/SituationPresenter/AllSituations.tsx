import React from 'react'

import { allColumns } from '~/screens/Accompaniments/InProgress/SituationPresenter/columns'
import { Presenter } from '~/screens/Accompaniments/InProgress/SituationPresenter/Presenter'
import { InProgressTabs } from '~/screens/Accompaniments/InProgress/types'
import { useInProgressAccompaniments } from '~/store/context'

const AllSituationsPresenter: React.VFC = () => {
  const accompaniments = useInProgressAccompaniments()

  return (
    <Presenter
      data={accompaniments}
      columns={allColumns}
      tab={InProgressTabs.ALL}
    />
  )
}

export { AllSituationsPresenter }
