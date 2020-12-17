import React from 'react'
import Loading from 'react-loading'

import { Container, IContainerProps as Props } from './styles'

const LoadingPanel: React.VFC<Props> = ({ isLoading }) => {
  return (
    <Container isLoading={isLoading}>
      <Loading color="#666" type="spin" width={32} height={32} />
    </Container>
  )
}

export { LoadingPanel }
