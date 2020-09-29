import React from 'react'

import { DataGrid } from '@shared/web-components'

import ProductsContainer from '~/components/ProductsContainer'

import { columns } from './columns'
import { Wrapper, Container } from './styles'

interface Accompaniment {
  key: string
  code: string
}

const News: React.FC = () => {
  return (
    <Wrapper>
      <Container>
        <DataGrid<Accompaniment>
          keyBinding="key"
          data={[{ key: 'Teste', code: '1' }]}
          columns={columns}
        />
      </Container>

      <ProductsContainer />
    </Wrapper>
  )
}

export default News
