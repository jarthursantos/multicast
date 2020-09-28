import React from 'react'

import { useColumnsHeader } from '../context'
import Cell from './Cell'
import { Container } from './styles'

const Header: React.FC = () => {
  const columns = useColumnsHeader()

  return (
    <Container>
      {columns.map(({ title, ...rest }, index) => (
        <Cell key={title} index={index} title={title} {...rest} />
      ))}
    </Container>
  )
}

export default Header
