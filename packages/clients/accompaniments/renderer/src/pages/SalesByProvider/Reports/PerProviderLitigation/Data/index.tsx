import React from 'react'

import { DataGrid, SplitContainer } from '@shared/web-components'

import { productColumns, providerColumns } from './columns'

const Data: React.FC = () => {
  return (
    <SplitContainer>
      <DataGrid<{ code: number }>
        keyExtractor={obj => `${obj.code}`}
        data={[{ code: 1 }]}
        columns={productColumns}
        resolveRowStyle={() => ({})}
      />
      <DataGrid<{ code: number }>
        keyExtractor={obj => `${obj.code}`}
        data={[{ code: 1 }]}
        columns={providerColumns}
        resolveRowStyle={() => ({})}
      />
    </SplitContainer>
  )
}

export default Data
