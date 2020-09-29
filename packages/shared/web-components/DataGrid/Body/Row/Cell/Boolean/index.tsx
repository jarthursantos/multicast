import React from 'react'

import { Container } from './styles'

interface Props {
  value: boolean
  positive: string
  negative: string
}

const Boolean: React.FC<Props> = ({ value, positive, negative }) => {
  return <Container>{value ? positive : negative}</Container>
}

export default Boolean
