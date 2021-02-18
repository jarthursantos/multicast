import React from 'react'

import { AccompanimentViewer } from './AccompanimentViewer'
import { SidePanel } from './SidePanel'
import { Wrapper } from './styles'
import { AccompanimentDetailsScreenProps } from './types'

const AccompanimentDetailsScreen: React.VFC<AccompanimentDetailsScreenProps> = () => {
  return (
    <Wrapper>
      <SidePanel />

      <AccompanimentViewer />
    </Wrapper>
  )
}

export { AccompanimentDetailsScreen }
