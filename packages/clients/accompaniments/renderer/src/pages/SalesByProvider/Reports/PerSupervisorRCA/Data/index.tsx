import React from 'react'

import { DataGrid, SplitContainer } from '@shared/web-components'

const Data: React.FC = () => {
  return (
    <SplitContainer resizeWidth="1fr">
      <DataGrid<{ code: string }>
        keyExtractor={obj => `${obj.code}`}
        data={[{ code: '1' }]}
        columns={[]}
        resolveRowStyle={() => ({})}
      />
      <SplitContainer resizeWidth="1fr">
        <DataGrid<{ code: string }>
          keyExtractor={obj => `${obj.code}`}
          data={[{ code: '1' }]}
          columns={[]}
          resolveRowStyle={() => ({})}
        />
        <DataGrid<{ code: string }>
          keyExtractor={obj => `${obj.code}`}
          data={[{ code: '1' }]}
          columns={[]}
          resolveRowStyle={() => ({})}
        />
      </SplitContainer>
    </SplitContainer>
  )
}

export default Data
