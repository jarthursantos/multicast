import React from 'react'

import { nonFreeOnBoardColumns } from '~/screens/Accompaniments/InProgress/SituationPresenter/columns'
import { Presenter } from '~/screens/Accompaniments/InProgress/SituationPresenter/Presenter'
import { InProgressTabs } from '~/screens/Accompaniments/InProgress/types'
import { useNonBilledAccompaniments } from '~/store/context'

const NonBilledSituationPresenter: React.VFC = () => {
  const accompaniments = useNonBilledAccompaniments()

  return (
    <Presenter
      data={accompaniments}
      columns={nonFreeOnBoardColumns}
      tab={InProgressTabs.NON_BILLED}
    />
  )
}

export { NonBilledSituationPresenter }
