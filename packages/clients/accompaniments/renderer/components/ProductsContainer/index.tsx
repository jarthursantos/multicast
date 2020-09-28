import React from 'react'

import { Container } from './styles'

const ProductsContainer: React.FC = () => {
  return (
    <Container
      width={300}
      height={Infinity}
      minConstraints={[250, Infinity]}
      maxConstraints={[500, Infinity]}
      handleSize={[10, 100]}
    />
  )
}

export default ProductsContainer
