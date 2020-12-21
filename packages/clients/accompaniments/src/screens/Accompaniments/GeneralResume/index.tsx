import React from 'react'

import { GeneralResumeDelayedPresenter } from '~/screens/Accompaniments/GeneralResume/DelayedPresenter'
import { GeneralResumeRepresentativity } from '~/screens/Accompaniments/GeneralResume/Representativity'
import {
  Wrapper,
  Container
} from '~/screens/Accompaniments/GeneralResume/styles'

import { AccompanimentsGeneralResumeProps } from './types'

const AccompanimentsGeneralResume: React.VFC<AccompanimentsGeneralResumeProps> = ({
  changeCurrentInProgressTab
}) => {
  return (
    <Wrapper>
      <Container>
        <GeneralResumeRepresentativity {...{ changeCurrentInProgressTab }} />

        <GeneralResumeDelayedPresenter {...{ changeCurrentInProgressTab }} />
      </Container>
    </Wrapper>
  )
}

export { AccompanimentsGeneralResume }
