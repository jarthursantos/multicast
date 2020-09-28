import React from 'react'

import { DataGrid } from '@shared/web-components'
import { CellType } from '@shared/web-components/DataGrid/Body/Row/Cell/types'

import ProductsContainer from '../../../components/ProductsContainer'
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
          columns={[
            {
              header: {
                title: 'Número',
                width: 100,
                align: 'center'
              },
              cell: {
                type: CellType.TEXT,
                path: 'key'
              },
              footer: {
                value: '1'
              }
            },
            {
              header: {
                title: 'Fornecedor',
                width: 100,
                align: 'center'
              },
              cell: {
                type: CellType.TEXT,
                path: 'code'
              },
              footer: {
                value: '1'
              }
            }
          ]}
        />
      </Container>

      <ProductsContainer />
    </Wrapper>
  )
}

export default News
