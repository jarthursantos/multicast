import React from 'react'

import { DataGrid } from '@shared/web-components'

import { Wrapper } from '../../styles'
import { columns } from './columns'

const Data: React.FC = () => {
  return (
    <Wrapper>
      <DataGrid<{ code: number }>
        keyBinding="code"
        data={[{ code: 1 }]}
        columns={columns}
        resolveRowStyle={() => ({})}
      />
    </Wrapper>
  )
}

export default Data
