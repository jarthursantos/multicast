import React from 'react'

import { DataGrid } from '@shared/web-components'

import { Wrapper } from '../styles'

const SyntheticMovement: React.FC = () => {
  return (
    <Wrapper>
      <DataGrid<{ code: string }>
        keyBinding="code"
        data={[{ code: '1' }]}
        columns={[]}
        resolveRowStyle={() => ({})}
      />
    </Wrapper>
  )
}

export default SyntheticMovement
