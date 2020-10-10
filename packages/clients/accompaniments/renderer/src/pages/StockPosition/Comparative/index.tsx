import React from 'react'

import { DataGrid } from '@shared/web-components'

import { Wrapper } from '../styles'
import { columns } from './columns'

const Comparative: React.FC = () => {
  return (
    <Wrapper>
      <DataGrid<{ code: number }>
        keyExtractor={obj => `${obj.code}`}
        data={[{ code: 1 }]}
        columns={columns}
        resolveRowStyle={() => ({})}
      />
    </Wrapper>
  )
}

export default Comparative
