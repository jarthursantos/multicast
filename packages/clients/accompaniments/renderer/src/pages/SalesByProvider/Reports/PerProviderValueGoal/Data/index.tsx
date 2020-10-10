import React from 'react'

import { DataGrid } from '@shared/web-components'

import { columns } from './columns'

const Data: React.FC = () => {
  return (
    <DataGrid<{ code: number }>
      keyExtractor={obj => `${obj.code}`}
      data={[{ code: 1 }]}
      columns={columns}
      resolveRowStyle={() => ({})}
    />
  )
}

export default Data
