import React, { useContext } from 'react'

import { Formatter } from 'tabulator-tables'

import {
  dateColumnOptions,
  Table,
  contabilFormatter,
  doubleFormatter
} from '~/components/Table'
import { HomeScreenContext } from '~/screens/Home/context'
import { ISchedule, ScheduleSituations } from '~/store/modules/schedules/types'
import {
  openEditClosedScheduleWindow,
  openEditOpenedScheduleWindow
} from '~/windows/schedule/edit/actions'
import { openNonReceivedScheduleWindow } from '~/windows/schedule/non-received/actions'
import { openReadonlyScheduleWindow } from '~/windows/schedule/readonly/actions'
import { openStoppedScheduleWindow } from '~/windows/schedule/stopped/actions'

export const scheduleSituationFormatter: Formatter = cell => {
  const situation: ScheduleSituations = cell.getValue()

  switch (situation) {
    case ScheduleSituations.CANCELED:
      return 'Cancelado'
    case ScheduleSituations.FINISHED:
      return 'Finalizado'
    case ScheduleSituations.NON_RECEIVED:
      return 'Não Recebido'
    case ScheduleSituations.OPENED:
      return 'Em Aberto'
    case ScheduleSituations.RECEIVED:
      return 'Recebido'
    case ScheduleSituations.RECEIVING:
      return 'Recebendo'
    case ScheduleSituations.RESCHEDULED:
      return 'Reagendado'
    case ScheduleSituations.SCHEDULED:
      return 'Agendado'
    case ScheduleSituations.WAITING:
      return 'Aguardando'
    default:
      return '-'
  }
}

const SchedulesTable: React.VFC = () => {
  const { schedulesOfDay, setSelectedSchedule } = useContext(HomeScreenContext)

  return (
    <Table
      options={{
        height: '100%',
        selectable: 1,
        rowClick: (_, row) => {
          if (!row || !row.select) return

          row?.select()
        },
        rowDblClick: (_, row) => {
          if (!row || !row.select) return

          row?.select()

          const schedule: ISchedule = row.getData()

          switch (schedule.situation) {
            case ScheduleSituations.OPENED:
              return openEditOpenedScheduleWindow(schedule)

            case ScheduleSituations.SCHEDULED:
              return openEditClosedScheduleWindow(schedule)

            case ScheduleSituations.WAITING:
            case ScheduleSituations.RECEIVING:
            case ScheduleSituations.RECEIVED:
            case ScheduleSituations.FINISHED:
              return openReadonlyScheduleWindow(schedule)

            case ScheduleSituations.CANCELED:
            case ScheduleSituations.RESCHEDULED:
              return openStoppedScheduleWindow(schedule)

            case ScheduleSituations.NON_RECEIVED:
              return openNonReceivedScheduleWindow(schedule)
          }
        },
        rowSelectionChanged: ([schedule]: ISchedule[]) =>
          setSelectedSchedule(schedule),
        rowFormatter: row => {
          const { situation }: ISchedule = row.getData()

          if (
            situation === ScheduleSituations.CANCELED ||
            situation === ScheduleSituations.RESCHEDULED
          ) {
            row.getElement().style.cssText = 'text-decoration: line-through'
          }
        },
        data: schedulesOfDay,
        columns: [
          {
            title: 'Transportadora',
            width: 250,
            field: 'shippingName',
            frozen: true
          },
          {
            title: 'Situação',
            width: 120,
            field: 'situation',
            bottomCalc: 'count',
            hozAlign: 'center',
            formatter: scheduleSituationFormatter
          },
          {
            title: 'Valor Total',
            width: 150,
            field: 'totalValue',
            sorter: 'number',
            formatter: contabilFormatter,
            bottomCalc: 'sum',
            bottomCalcFormatter: contabilFormatter
          },
          {
            title: 'Peso Total',
            width: 150,
            field: 'totalWeight',
            hozAlign: 'right',
            sorter: 'number',
            formatter: doubleFormatter,
            bottomCalc: 'sum',
            bottomCalcFormatter: doubleFormatter
          },
          {
            title: 'Volume Total',
            width: 150,
            field: 'totalVolume',
            hozAlign: 'right',
            sorter: 'number',
            formatter: doubleFormatter,
            bottomCalc: 'sum',
            bottomCalcFormatter: doubleFormatter
          },
          {
            title: 'Vl Descarga',
            width: 150,
            field: 'dischargeValue',
            sorter: 'number',
            formatter: contabilFormatter,
            bottomCalc: 'sum',
            bottomCalcFormatter: contabilFormatter
          },
          {
            title: 'Vl Recibo',
            width: 150,
            field: 'receiptValue',
            sorter: 'number',
            formatter: contabilFormatter,
            bottomCalc: 'sum',
            bottomCalcFormatter: contabilFormatter
          },
          { title: 'Tipo Veículo', width: 150, field: 'vehicleType' },
          {
            title: 'Frete',
            width: 120,
            field: 'freightType',
            hozAlign: 'center'
          },
          {
            title: 'Dt. Criação',
            width: 150,
            field: 'createdAt',
            ...dateColumnOptions
          },
          {
            title: 'Últ. Alteração',
            width: 150,
            field: 'updatedAt',
            ...dateColumnOptions
          }
        ]
      }}
    />
  )
}

export { SchedulesTable }
