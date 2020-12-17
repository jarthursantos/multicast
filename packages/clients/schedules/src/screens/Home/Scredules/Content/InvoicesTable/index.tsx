import React, { useContext, useEffect, useRef } from 'react'

import { Formatter } from 'tabulator-tables'

import {
  Table,
  dateColumnOptions,
  contabilFormatter,
  doubleFormatter
} from '~/components/Table'
import { HomeScreenContext } from '~/screens/Home/context'
import {
  Divergence,
  IInvoice,
  InvoiceDivergence,
  InvoiceSituations,
  ISchedule
} from '~/store/modules/schedules/types'
import { openInvoiceEditModeWindow } from '~/windows/invoice/edit/actions'
import { openInvoiceReadonlyModeWindow } from '~/windows/invoice/readonly/actions'

export const invoiceSituationFormatter: Formatter = cell => {
  const situation: InvoiceSituations = cell.getValue()

  switch (situation) {
    case InvoiceSituations.BONUS_FINISHED:
      return 'Bônus Finalizado'
    case InvoiceSituations.BONUS_LAUNCHED:
      return 'Bônus Gerado'
    case InvoiceSituations.CANCELED:
      return 'Cancelada'
    case InvoiceSituations.INVOICE_LAUNCHED:
      return 'Nota Lançada'
    case InvoiceSituations.INVOICE_NON_LAUNCHED:
      return 'Nota Não Lançada'
    case InvoiceSituations.INVOICE_PRE_LAUNCHED:
      return 'Nota Pré Lançada'
    case InvoiceSituations.OS_FINISHED:
      return 'OS Finalizada'
    case InvoiceSituations.OS_GENERATED:
      return 'OS Gerada'
    default:
      return '-'
  }
}

export const invoiceDivergenceFormatter: Formatter = cell => {
  const divergence: Divergence = cell.getValue()

  switch (divergence) {
    case Divergence.ADDED:
      return 'Nota Extra'
    case Divergence.NOT_RECEIVED:
      return 'Não Recebida'
    case Divergence.RECEIVED:
      return 'Recebida'
    case Divergence.RESCHEDULED:
      return 'Reagendada'
    default:
      return '-'
  }
}

const InvoicesTable: React.VFC = () => {
  const schedule = useRef<ISchedule>(undefined)

  const { invoicesOfSelectedSchedule, selectedSchedule } = useContext(
    HomeScreenContext
  )

  useEffect(() => {
    schedule.current = selectedSchedule
  }, [selectedSchedule])

  return (
    <Table
      options={{
        height: '100%',
        data: invoicesOfSelectedSchedule,
        rowDblClick: (_, row) => {
          if (!schedule.current) return

          const invoice: IInvoice = row.getData()

          if (
            schedule.current.receivedAt ||
            (invoice.divergence &&
              invoice.divergence !== InvoiceDivergence.ADDED)
          ) {
            openInvoiceReadonlyModeWindow(invoice)
          } else {
            openInvoiceEditModeWindow(schedule.current, invoice)
          }
        },
        rowFormatter: row => {
          const { situation, divergence }: IInvoice = row.getData()

          if (
            situation === InvoiceSituations.CANCELED ||
            divergence === InvoiceDivergence.NOT_RECEIVED ||
            divergence === InvoiceDivergence.RESCHEDULED
          ) {
            row.getElement().style.cssText = 'text-decoration: line-through'
          }
        },
        columns: [
          {
            title: 'NF',
            width: 120,
            field: 'number',
            sorter: 'number',
            hozAlign: 'right',
            bottomCalc: 'count',
            frozen: true
          },
          {
            title: 'Fornecedor',
            width: 350,
            field: 'provider.name'
          },
          {
            title: 'Fantasia',
            width: 200,
            field: 'provider.fantasy'
          },
          {
            title: 'Situação',
            width: 180,
            hozAlign: 'center',
            field: 'situation',
            formatter: invoiceSituationFormatter
          },
          {
            title: 'Ocorrência',
            width: 140,
            hozAlign: 'center',
            field: 'divergence',
            formatter: invoiceDivergenceFormatter
          },
          {
            title: 'CNPJ',
            width: 150,
            field: 'provider.cnpj',
            hozAlign: 'center'
          },
          {
            title: 'Emissão NF',
            width: 150,
            field: 'emittedAt',
            ...dateColumnOptions
          },
          {
            title: 'Valor NF',
            width: 110,
            field: 'value',
            sorter: 'number',
            formatter: contabilFormatter,
            bottomCalc: 'sum',
            bottomCalcFormatter: contabilFormatter
          },
          {
            title: 'Peso',
            width: 100,
            field: 'weight',
            hozAlign: 'right',
            sorter: 'number',
            formatter: doubleFormatter,
            bottomCalc: 'sum',
            bottomCalcFormatter: doubleFormatter
          },
          {
            title: 'Volume',
            width: 100,
            field: 'volume',
            hozAlign: 'right',
            sorter: 'number',
            bottomCalc: 'sum'
          },
          { title: 'Chave NF', width: 400, field: 'key' },
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

export { InvoicesTable }
