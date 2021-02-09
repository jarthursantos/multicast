import React from 'react'

import { Checkbox } from '@shared/web-components'

import { Container } from './styles'
import { IRepresentedProps } from './types'

const Represented: React.VFC<IRepresentedProps> = ({
  data,
  value,
  onValueChange
}) => {
  return (
    <Container>
      <Checkbox
        label={data.fantasy}
        value={value}
        onValueChange={selected => onValueChange(selected)}
      />
    </Container>
  )
}

export { Represented }
