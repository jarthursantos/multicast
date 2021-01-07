import React, { forwardRef } from 'react'

import { InProgressScreenContextProvider } from './context'
import { InProgressSituationGroup } from './SituationGroup'
import { InProgressSituationPresenter } from './SituationPresenter'
import { Wrapper, Header } from './styles'
import {
  AccompanimentsInProgressComponentHandles,
  InProgressTabs
} from './types'

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
