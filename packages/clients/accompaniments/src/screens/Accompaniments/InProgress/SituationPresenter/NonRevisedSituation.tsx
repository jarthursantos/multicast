import React from 'react'

import { nonReviewedColumns } from '~/screens/Accompaniments/InProgress/SituationPresenter/columns'
import { Presenter } from '~/screens/Accompaniments/InProgress/SituationPresenter/Presenter'
import { InProgressTabs } from '~/screens/Accompaniments/InProgress/types'
import { useNonRevisedAccompaniments } from '~/store/context'

const NonRevisedSituationPresenter: React.VFC = () => {
  const accompaniments = useNonRevisedAccompaniments()

  return (
    <Presenter
      data={accompaniments}
      columns={nonReviewedColumns}
      tab={InProgressTabs.NON_REVISED}
    />
  )
}

export { NonRevisedSituationPresenter }
