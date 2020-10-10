import React from 'react'

import { DataGrid } from '@shared/web-components'

import { columns } from './columns'
import { Container } from './styles'

interface Product {
  code: string
  provider: string
}

const ProductsContainer: React.FC = () => {
  return (
    <Container
      width={300}
      height={Infinity}
      minConstraints={[250, Infinity]}
      maxConstraints={[500, Infinity]}
      handleSize={[10, 100]}
    >
      <DataGrid<Product>
        data={[{ code: '1', provider: 'Teste' }]}
        keyExtractor={product => product.code}
        columns={columns}
        resolveRowStyle={() => ({})}
      />
    </Container>
  )
}

export default ProductsContainer
