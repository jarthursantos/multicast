import React from 'react'

import { DataGrid, SplitContainer } from '@shared/web-components'

import { rcaColumns, providerColumns } from './columns'

const Data: React.FC = () => {
  return (
    <SplitContainer>
      <DataGrid<{ code: number }>
        keyBinding="code"
        data={[{ code: 1 }]}
        columns={rcaColumns}
        resolveRowStyle={() => ({})}
      />
      <DataGrid<{ code: number }>
        keyBinding="code"
        data={[{ code: 1 }]}
        columns={providerColumns}
        resolveRowStyle={() => ({})}
      />
    </SplitContainer>
  )
}

export default Data