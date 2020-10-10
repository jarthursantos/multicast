import React from 'react'

import { DataGrid } from '@shared/web-components'

import { useAllRepresentatives } from '../context'
import { Representative } from '../types'
import { columns } from './columns'
import { Wrapper } from './styles'

const General: React.FC = () => {
  const data = useAllRepresentatives()

  return (
    <Wrapper>
      <DataGrid<Representative>
        keyExtractor={obj => `${obj.provider.code}`}
        data={data}
        columns={columns}
        resolveRowStyle={() => ({})}
      />
    </Wrapper>
  )
}

export default General
