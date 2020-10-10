import React from 'react'

import { DataGrid } from '@shared/web-components'

import { valuesColumns, evolutionColumns } from './columns'
import { PerMonthWrapper, Separator } from './styles'
import { MonthProps } from './types'

const Month: React.VFC<MonthProps> = ({ valuesData, evolutionData }) => {
  return (
    <PerMonthWrapper>
      <DataGrid<{ code: number }>
        keyExtractor={obj => `${obj.code}`}
        data={valuesData}
        columns={valuesColumns}
        resolveRowStyle={() => ({})}
        style={{ style: { gridArea: 'TOP' } }}
      />

      <Separator />

      <DataGrid<{ code: number }>
        keyExtractor={obj => `${obj.code}`}
        data={evolutionData}
        columns={evolutionColumns}
        resolveRowStyle={() => ({})}
        style={{ style: { gridArea: 'BOTTOM' } }}
      />
    </PerMonthWrapper>
  )
}

export default Month
