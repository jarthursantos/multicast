import React from 'react'

import ProductsContainer from '../../../components/ProductsContainer'
import { Wrapper, Header, Container } from './styles'

const InProgress: React.FC = () => {
  return (
    <Wrapper>
      <Header />

      <Container>
        <div style={{ flex: 1 }}></div>

        <ProductsContainer />
      </Container>
    </Wrapper>
  )
}

export default InProgress
