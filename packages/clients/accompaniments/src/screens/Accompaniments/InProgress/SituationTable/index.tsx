import React, { useEffect, useState } from 'react'

import { useWatchAction } from '@shared/action-watcher'

import { Table } from '~/components/Table'
import { useTypedSelector } from '~/store'
import { Accompaniment, Types } from '~/store/modules/accompaniments/types'
import { openAccompanimentDetails } from '~/windows/AccompanimentDetails/actions'

import { InProgressSituationTableProps } from './types'

const InProgressSituationTable: React.VFC<InProgressSituationTableProps> = ({
  data,
  columns,
  tab: persistenceID,
  onSelectionChange
}) => {
  const { token } = useTypedSelector(state => state.auth)

  const [selectedRow, setSelectedRow] = useState<Accompaniment>()

  useEffect(() => onSelectionChange(selectedRow), [
    selectedRow,
    onSelectionChange
  ])

  useWatchAction(() => {
    setSelectedRow(undefined)
  }, [
    Types.FILTER_ACCOMPANIMENT_REQUEST,
    Types.CLEAR_FILTER_ACCOMPANIMENT_REQUEST
  ])

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
        initialSort: [{ column: 'delay', dir: 'desc' }],
        persistenceID,
        persistence: {
          columns: true,
          sort: true
        },
        rowSelected: row => setSelectedRow(row.getData()),
        rowDeselected: () => setSelectedRow(undefined),
        rowDblClick: (_, row) => {
          row.select()

          openAccompanimentDetails(row.getData(), token)
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

export { InProgressSituationTable }
