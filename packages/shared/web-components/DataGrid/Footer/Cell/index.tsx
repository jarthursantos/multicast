import React from 'react'

import { Indexable } from '../../types'
import { Container } from './styles'
import { FooterCellProps } from './types'

const Cell: React.VFC<FooterCellProps & Indexable> = ({ value }) => {
  return <Container>{value}</Container>
}

export default Cell
