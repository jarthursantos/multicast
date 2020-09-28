import React from 'react'

import { Container } from './styles'
import { RowCellProps } from './types'

const Cell: React.FC<RowCellProps> = ({ value }) => {
  return <Container>{value}</Container>
}

export default Cell
