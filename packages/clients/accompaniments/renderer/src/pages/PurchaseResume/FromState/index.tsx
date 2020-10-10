import React from 'react'

import { DataGrid, SplitContainer } from '@shared/web-components'

import { invoiceColumns } from '../columns'
import { columns } from './columns'

const FromState: React.FC = () => {
  return (
    <SplitContainer resizeWidth="1fr">
      <DataGrid<{ code: number }>
        keyExtractor={obj => `${obj.code}`}
        data={[{ code: 1 }]}
        columns={columns}
        resolveRowStyle={() => ({})}
      />
      <DataGrid<{ code: number }>
        keyExtractor={obj => `${obj.code}`}
        data={[{ code: 1 }]}
        columns={invoiceColumns}
        resolveRowStyle={() => ({})}
      />
    </SplitContainer>
  )
}

export default FromState
