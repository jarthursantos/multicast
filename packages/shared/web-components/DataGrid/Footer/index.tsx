import React from 'react'

import { useColumnsFooter } from '../context'
import Cell from './Cell'
import { Container } from './styles'

const Footer: React.VFC = () => {
  const columns = useColumnsFooter()

  return (
    <Container>
      {columns.map(({ key, ...rest }, index) => (
        <Cell key={key} index={index} {...rest} />
      ))}
    </Container>
  )
}

export default Footer
