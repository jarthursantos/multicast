import React from 'react'

import { nonExpectedBillingColumns } from '~/screens/Accompaniments/InProgress/SituationPresenter/columns'
import { Presenter } from '~/screens/Accompaniments/InProgress/SituationPresenter/Presenter'
import { InProgressTabs } from '~/screens/Accompaniments/InProgress/types'
import { useNonExpectedBillingAccompaniments } from '~/store/context'

const NonExpectedBillingSituationPresenter: React.VFC = () => {
  const accompaniments = useNonExpectedBillingAccompaniments()

  return (
    <Presenter
      data={accompaniments}
      columns={nonExpectedBillingColumns}
      tab={InProgressTabs.NON_EXPECTED_BILLING}
    />
  )
}

export { NonExpectedBillingSituationPresenter }
