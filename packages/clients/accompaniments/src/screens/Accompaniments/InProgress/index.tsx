import React, { forwardRef } from 'react'

import { InProgressScreenContextProvider } from '~/screens/Accompaniments/InProgress/context'
import { InProgressSituationGroup } from '~/screens/Accompaniments/InProgress/SituationGroup'
import { InProgressSituationPresenter } from '~/screens/Accompaniments/InProgress/SituationPresenter'
import { Wrapper, Header } from '~/screens/Accompaniments/InProgress/styles'
import {
  AccompanimentsInProgressComponentHandles,
  InProgressTabs
} from '~/screens/Accompaniments/InProgress/types'

const AccompanimentsInProgressComponent: React.ForwardRefRenderFunction<AccompanimentsInProgressComponentHandles> = (
  _,
  ref
) => {
  return (
    <InProgressScreenContextProvider
      ref={ref}
      initialSituation={InProgressTabs.ALL}
    >
      <Wrapper>
        <Header>
          <InProgressSituationGroup />
        </Header>

        <InProgressSituationPresenter />
      </Wrapper>
    </InProgressScreenContextProvider>
  )
}

const AccompanimentsInProgress = forwardRef(AccompanimentsInProgressComponent)

export { AccompanimentsInProgress }
