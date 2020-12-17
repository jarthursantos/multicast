import React from 'react'

import { nonReleasedColumns } from '~/screens/Accompaniments/InProgress/SituationPresenter/columns'
import { Presenter } from '~/screens/Accompaniments/InProgress/SituationPresenter/Presenter'
import { InProgressTabs } from '~/screens/Accompaniments/InProgress/types'
import { useNonReleasedAccompaniments } from '~/store/context'

const NonReleasedSituationPresenter: React.VFC = () => {
  const accompaniments = useNonReleasedAccompaniments()

  return (
    <Presenter
      data={accompaniments}
      columns={nonReleasedColumns}
      tab={InProgressTabs.NON_RELEASED}
    />
  )
}

export { NonReleasedSituationPresenter }
