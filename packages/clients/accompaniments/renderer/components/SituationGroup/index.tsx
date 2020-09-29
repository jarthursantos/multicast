import React from 'react'

import Button from './Button'
import { SituationGroupContextProvider } from './context'
import { Container } from './styles'
import { SituationGroupProps } from './types'

const SituationGroup: React.VFC<SituationGroupProps> & {
  Button: typeof Button
} = ({ initialGroup, onGroupChange, children }) => {
  return (
    <SituationGroupContextProvider
      onChange={onGroupChange}
      initialSituation={initialGroup}
    >
      <Container>{children}</Container>
    </SituationGroupContextProvider>
  )
}

SituationGroup.Button = Button

export default SituationGroup
