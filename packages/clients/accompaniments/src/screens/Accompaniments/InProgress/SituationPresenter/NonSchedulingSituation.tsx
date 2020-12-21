import React from 'react'

import { nonSchedulingColumns } from '~/screens/Accompaniments/InProgress/SituationPresenter/columns'
import { Presenter } from '~/screens/Accompaniments/InProgress/SituationPresenter/Presenter'
import { InProgressTabs } from '~/screens/Accompaniments/InProgress/types'
import { useNonSchedulingAccompaniments } from '~/store/context'

const NonSchedulingSituationPresenter: React.VFC = () => {
  const accompaniments = useNonSchedulingAccompaniments()

  return (
    <Presenter
      data={accompaniments}
      columns={nonSchedulingColumns}
      tab={InProgressTabs.NON_SCHEDULING}
    />
  )
}

export { NonSchedulingSituationPresenter }
