import React, { useCallback, useContext } from 'react'

import { RowEventCallback } from 'tabulator-tables'

import { Table } from '~/components/Table'
import { HomeScreenContext } from '~/screens/Home/context'
import { IScheduleRequest } from '~/store/modules/schedule-requests/types'
import { openEditScheduleRequestWindow } from '~/windows/schedule-request/edit/actions'

const ScheduleRequestsTable: React.VFC = () => {
  const { scheduleRequestsOfDay } = useContext(HomeScreenContext)

  const handleRowClick: RowEventCallback = useCallback((_, row) => {
    const scheduleRequest: IScheduleRequest = row.getData()

    openEditScheduleRequestWindow(scheduleRequest)
  }, [])

  return (
    <Table
      options={{
        layout: 'fitDataStretch',
        height: '100%',
        data: scheduleRequestsOfDay,
        rowDblClick: handleRowClick,
        columns: [
          { title: 'Pré Agendados', field: 'provider.name', resizable: false }
        ]
      }}
    />
  )
}

export { ScheduleRequestsTable }
