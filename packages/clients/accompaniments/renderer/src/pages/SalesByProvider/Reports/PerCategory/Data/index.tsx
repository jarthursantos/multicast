import React from 'react'

import { DataGrid, SplitContainer } from '@shared/web-components'

import { categoryColumns, providerColumns } from './columns'

const Data: React.FC = () => {
  return (
    <SplitContainer>
      <DataGrid<{ code: number }>
        keyExtractor={obj => `${obj.code}`}
        data={[{ code: 1 }]}
        columns={categoryColumns}
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
