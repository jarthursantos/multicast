import React from 'react'

import { Indexable } from '../../types'
import { Container } from './styles'
import { HeaderCellProps } from './types'

const Cell: React.FC<HeaderCellProps & Indexable> = ({ title }) => {
  return <Container>{title} </Container>
}

export default Cell
