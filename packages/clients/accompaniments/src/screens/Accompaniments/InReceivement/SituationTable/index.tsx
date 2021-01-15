import React from 'react'

import { Table } from '@shared/web-components/Table'

import { Accompaniment } from '~/store/modules/accompaniments/types'
import { openAccompanimentDetails } from '~/windows/AccompanimentDetails/actions'

import { ReceivementSituationTableProps } from './types'

const ReceivementSituationTable: React.VFC<ReceivementSituationTableProps> = ({
  data,
  columns,
  tab: persistenceID,
  onSelectionChange
}) => {
  return (
    <Table
      options={{
        data,
        columns,
        selectable: 1,
        layout: 'fitDataFill',
        headerHozAlign: 'center',
        movableColumns: true,
        headerSortTristate: true,
        persistenceID,
        persistence: {
          columns: true,
          sort: true
        },
        rowClick: (_, row) => {
          if (!row || !row.select) return

          row?.select()
        },
        rowSelectionChanged: ([accompaniment]: Accompaniment[]) => {
          onSelectionChange(accompaniment)
        },
        rowDblClick: (_, row) => {
          if (!row || !row.select) return

          row?.select()

          openAccompanimentDetails(row.getData())
        },
        rowFormatter: row => {
          const accompaniment: Accompaniment = row.getData()

          if (accompaniment.purchaseOrder.isBonification) {
            row.getElement().style.color = 'blue'
          }

          if (accompaniment.isOutstanding) {
            row.getElement().style.fontWeight = 'bold'
          }
        }
      }}
    />
  )
}

export { ReceivementSituationTable }
