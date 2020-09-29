import React from 'react'

import { formatPriceWithoutSymbol } from './format'
import { Container } from './styles'

interface Props {
  value: number
}

const Contabil: React.FC<Props> = ({ value }) => {
  return (
    <Container>
      <div>R$</div>
      <div>{isNaN(value) ? '-' : formatPriceWithoutSymbol(value)}</div>
    </Container>
  )
}

export default Contabil
