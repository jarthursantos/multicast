import React, { useContext, useEffect, useRef, useState } from 'react'

import { Formatter } from 'tabulator-tables'

import {
  contabilFormatter,
  dateColumnOptions,
  doubleFormatter,
  Table
} from '~/components/Table'
import { HomeScreenContext } from '~/screens/Home/context'
import {
  Divergence,
  IInvoice,
  InvoiceDivergence,
  InvoiceSituations,
  ISchedule,
  ScheduleSituations
} from '~/store/modules/schedules/types'
import { openInvoiceEditModeWindow } from '~/windows/invoice/edit/actions'
import { openInvoiceReadonlyModeWindow } from '~/windows/invoice/readonly/actions'

import { Layout, SchedulesWrapper, InvoicesWrapper } from './styles'

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

const PendingProccessReport: React.VFC = () => {
  const { pendingProccess } = useContext(HomeScreenContext)

  const schedule = useRef<ISchedule>(null)
  const [selectedSchedule, setSelectedSchedule] = useState<ISchedule>()

  useEffect(() => {
    schedule.current = selectedSchedule
  }, [selectedSchedule])

  return (
    <Layout>
      <SchedulesWrapper>
        <Table
          options={{
            height: '100%',
            data: pendingProccess,
            rowClick: (_, row) => {
              if (!row || !row.select) return

              row?.select()
            },
            rowSelectionChanged: ([schedule]: ISchedule[]) =>
              setSelectedSchedule(schedule),
            selectable: 1,
            columns: [
              {
                title: 'Data',
                width: 120,
                field: 'scheduledAt',
                ...dateColumnOptions
              },
              {
                title: 'Transportadora',
                width: 250,
                field: 'shippingName'
              },
              {
                title: 'Situação',
                width: 120,
                field: 'situation',
                bottomCalc: 'count',
                hozAlign: 'center',
                formatter: scheduleSituationFormatter
              }
            ]
          }}
        />
      </SchedulesWrapper>

      <InvoicesWrapper>
        <Table
          options={{
            height: '100%',
            rowDblClick: (_, row) => {
              if (!schedule.current) return

              const invoice: IInvoice = row.getData()

              if (
                schedule.current.receivedAt ||
                (invoice.divergence &&
                  invoice.divergence !== InvoiceDivergence.ADDED)
              ) {
                openInvoiceReadonlyModeWindow(schedule.current, invoice)
              } else {
                openInvoiceEditModeWindow(schedule.current, invoice)
              }
            },
            data:
              selectedSchedule?.invoices.filter(invoice => {
                if (
                  invoice.divergence === InvoiceDivergence.RESCHEDULED ||
                  invoice.situation === InvoiceSituations.OS_FINISHED ||
                  invoice.situation === InvoiceSituations.CANCELED
                ) {
                  return false
                }

                return true
              }) || [],
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
      </InvoicesWrapper>
    </Layout>
  )
}

export { PendingProccessReport }
