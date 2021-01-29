import React from 'react'

import { Container, Title } from './styles'
import { IHeaderProps } from './types'

const Header: React.VFC<IHeaderProps> = ({ title }) => {
  return (
    <Container>
      <Title>{title}</Title>
    </Container>
  )
}

export { Header }
