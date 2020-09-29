import React from 'react'

import { Container } from './styles'

interface Props {
  value: number
  fractionDigits?: number
}

const Number: React.FC<Props> = ({ value, fractionDigits = 0 }) => {
  return <Container>{value?.toFixed(fractionDigits) || '-'}</Container>
}

export default Number
