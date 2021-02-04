import React from 'react'

import { CheckboxInput } from '@shared/web-components/Form'

import { Container } from './styles'
import { IRepresentedProps } from './types'

const Represented: React.VFC<IRepresentedProps> = ({ data }) => {
  return (
    <Container>
      <CheckboxInput name="represented" label={data.fantasy} />
    </Container>
  )
}

export { Represented }
