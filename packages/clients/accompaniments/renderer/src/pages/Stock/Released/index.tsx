import React from 'react'

import { DataGrid, SplitContainer } from '@shared/web-components'

import { providerColumns } from '../columns'
import { columns } from './columns'

const Release: React.FC = () => {
  return (
    <SplitContainer>
      <DataGrid<{ code: number }>
        keyBinding="code"
        data={[{ code: 1 }]}
        columns={providerColumns}
        resolveRowStyle={() => ({})}
      />
      <DataGrid<{ code: number }>
        keyBinding="code"
        data={[{ code: 1 }]}
        columns={columns}
        resolveRowStyle={() => ({})}
      />
    </SplitContainer>
  )
}

export default Release
