import React from 'react'

import { Indexable } from '../../types'
import { Container } from './styles'
import { FooterCellProps } from './types'

const Cell: React.VFC<FooterCellProps & Indexable> = ({
  value,
  index,
  align
}) => {
  return (
    <Container className={`col-${index}`} align={align}>
      {value}
    </Container>
  )
}

export default Cell
