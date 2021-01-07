import React from 'react'
import Loading from 'react-loading'

import { Container, LoadingStyle, IContainerProps } from './styles'

const LoadingPanel: React.VFC<IContainerProps> = ({ isLoading }) => {
  return (
    <Container isLoading={isLoading}>
      <Loading color="#666" type="spin" width={32} height={32} />

      {isLoading && <LoadingStyle />}
    </Container>
  )
}

export { LoadingPanel }
