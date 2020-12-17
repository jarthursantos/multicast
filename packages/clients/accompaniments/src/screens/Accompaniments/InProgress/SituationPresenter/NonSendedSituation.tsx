import React from 'react'

import { nonSendedColumns } from '~/screens/Accompaniments/InProgress/SituationPresenter/columns'
import { Presenter } from '~/screens/Accompaniments/InProgress/SituationPresenter/Presenter'
import { InProgressTabs } from '~/screens/Accompaniments/InProgress/types'
import { useNonSendedAccompaniments } from '~/store/context'

const NonSendedSituationPresenter: React.VFC = () => {
  const accompaniments = useNonSendedAccompaniments()

  return (
    <Presenter
      data={accompaniments}
      columns={nonSendedColumns}
      tab={InProgressTabs.NON_SENDED}
    />
  )
}

export { NonSendedSituationPresenter }
