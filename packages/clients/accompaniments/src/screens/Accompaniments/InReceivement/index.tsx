import React, { forwardRef } from 'react'

import { ReceivementScreenContextProvider } from './context'
import { ReceivementSituationGroup } from './SituationGroup'
import { ReceivementSituationPresenter } from './SituationPresenter'
import { Wrapper, Header } from './styles'
import {
  AccompanimentsInReceivementComponentHandles,
  InReceivementTabs
} from './types'

const AccompanimentsInReceivementComponent: React.ForwardRefRenderFunction<AccompanimentsInReceivementComponentHandles> = (
  _,
  ref
) => {
  return (
    <ReceivementScreenContextProvider
      ref={ref}
      initialSituation={InReceivementTabs.NON_SCHEDULED}
    >
      <Wrapper>
        <Header>
          <ReceivementSituationGroup />
        </Header>

        <ReceivementSituationPresenter />
      </Wrapper>
    </ReceivementScreenContextProvider>
  )
}

const AccompanimentsInReceivement = forwardRef(
  AccompanimentsInReceivementComponent
)

export { AccompanimentsInReceivement }
