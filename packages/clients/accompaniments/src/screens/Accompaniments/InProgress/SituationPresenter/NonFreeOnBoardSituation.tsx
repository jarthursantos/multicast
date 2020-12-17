import React from 'react'

import { nonFreeOnBoardColumns } from '~/screens/Accompaniments/InProgress/SituationPresenter/columns'
import { Presenter } from '~/screens/Accompaniments/InProgress/SituationPresenter/Presenter'
import { InProgressTabs } from '~/screens/Accompaniments/InProgress/types'
import { useNonFreeOnBoardAccompaniments } from '~/store/context'

const NonFreeOnBoardSituationPresenter: React.VFC = () => {
  const accompaniments = useNonFreeOnBoardAccompaniments()

  return (
    <Presenter
      data={accompaniments}
      columns={nonFreeOnBoardColumns}
      tab={InProgressTabs.NON_FREE_ON_BOARD}
    />
  )
}

export { NonFreeOnBoardSituationPresenter }
