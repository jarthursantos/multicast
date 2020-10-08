import React from 'react'

import { DataGrid, SplitContainer } from '@shared/web-components'

const Data: React.FC = () => {
  return (
    <SplitContainer resizeWidth="1fr">
      <DataGrid<{ code: string }>
        keyBinding="code"
        data={[{ code: '1' }]}
        columns={[]}
        resolveRowStyle={() => ({})}
      />
      <SplitContainer resizeWidth="1fr">
        <DataGrid<{ code: string }>
          keyBinding="code"
          data={[{ code: '1' }]}
          columns={[]}
          resolveRowStyle={() => ({})}
        />
        <DataGrid<{ code: string }>
          keyBinding="code"
          data={[{ code: '1' }]}
          columns={[]}
          resolveRowStyle={() => ({})}
        />
      </SplitContainer>
    </SplitContainer>
  )
}

export default Data
