import {
  ColumnDefinition,
  MenuObject,
  MenuSeparator,
  ColumnComponent
} from 'tabulator-tables'

import { contabilFormatter } from '@shared/web-components/Table'

const contextMenu: (MenuObject<ColumnComponent> | MenuSeparator)[] = [
  {
    label: 'Melhor largura',
    action: (_, column) => {
      // resize to best fit
      column.setWidth(true)
      // convert best fit to number
      column.setWidth(column.getWidth())
    }
  }
]

export const allColumns: ColumnDefinition[] = [
  {
    title: 'Nº Pedido',
    field: 'purchaseOrder.number',
    sorter: 'number',
    hozAlign: 'right',
    width: 100,
    bottomCalc: 'count',
    headerContextMenu: contextMenu
  },
  {
    title: 'Cód. Fornec.',
    field: 'purchaseOrder.provider.code',
    hozAlign: 'right',
    sorter: 'number',
    width: 120,
    headerContextMenu: contextMenu
  },
  {
    title: 'Fornecedor',
    field: 'purchaseOrder.provider.name',
    sorter: 'string',
    width: 250,
    headerContextMenu: contextMenu
  },
  {
    title: 'Emissão',
    field: 'purchaseOrder.emittedAt',
    sorter: 'datetime',
    sorterParams: {
      format: 'YYYY-MM-DD'
    },
    hozAlign: 'center',
    formatter: 'datetime',
    formatterParams: {
      inputFormat: 'YYYY-MM-DD',
      outputFormat: 'DD/MM/YYYY',
      invalidPlaceholder: '-'
    },
    width: 100,
    headerContextMenu: contextMenu
  },
  {
    title: 'Atraso (Dias)',
    field: 'delay',
    sorter: 'number',
    width: 120,
    hozAlign: 'right',
    headerContextMenu: contextMenu
  },
  {
    title: 'Marca',
    field: 'purchaseOrder.provider.fantasy',
    sorter: 'string',
    width: 150,
    headerContextMenu: contextMenu
  },
  {
    title: 'Valor Total',
    field: 'purchaseOrder.amountValue',
    sorter: 'number',
    width: 120,
    formatter: contabilFormatter,
    bottomCalc: 'sum',
    bottomCalcFormatter: contabilFormatter,
    headerContextMenu: contextMenu
  },
  {
    title: 'Comprador',
    field: 'purchaseOrder.buyer.name',
    sorter: 'string',
    width: 200,
    headerContextMenu: contextMenu
  },
  {
    title: 'Frete',
    field: 'purchaseOrder.freight',
    sorter: 'string',
    width: 80,
    headerContextMenu: contextMenu
  },
  {
    title: 'Representante',
    field: 'purchaseOrder.provider.representative.name',
    sorter: 'string',
    width: 180,
    headerContextMenu: contextMenu
  },
  {
    title: 'Envio',
    field: 'sendedAt',
    hozAlign: 'center',
    sorter: 'datetime',
    sorterParams: {
      format: 'YYYY-MM-DD'
    },
    formatter: 'datetime',
    formatterParams: {
      inputFormat: 'YYYY-MM-DD',
      outputFormat: 'DD/MM/YYYY',
      invalidPlaceholder: '-'
    },
    width: 100,
    headerContextMenu: contextMenu
  },
  {
    title: 'Revisão',
    field: 'reviewedAt',
    hozAlign: 'center',
    sorter: 'datetime',
    sorterParams: {
      format: 'YYYY-MM-DD'
    },
    formatter: 'datetime',
    formatterParams: {
      inputFormat: 'YYYY-MM-DD',
      outputFormat: 'DD/MM/YYYY',
      invalidPlaceholder: '-'
    },
    width: 100,
    headerContextMenu: contextMenu
  },
  {
    title: 'Liberação',
    field: 'releasedAt',
    hozAlign: 'center',
    sorter: 'datetime',
    sorterParams: {
      format: 'YYYY-MM-DD'
    },
    formatter: 'datetime',
    formatterParams: {
      inputFormat: 'YYYY-MM-DD',
      outputFormat: 'DD/MM/YYYY',
      invalidPlaceholder: '-'
    },
    width: 100,
    headerContextMenu: contextMenu
  },
  {
    title: 'Prev. Faturamento',
    field: 'expectedBillingAt',
    hozAlign: 'center',
    sorter: 'datetime',
    sorterParams: {
      format: 'YYYY-MM-DD'
    },
    formatter: 'datetime',
    formatterParams: {
      inputFormat: 'YYYY-MM-DD',
      outputFormat: 'DD/MM/YYYY',
      invalidPlaceholder: '-'
    },
    width: 150,
    headerContextMenu: contextMenu
  },
  {
    title: 'Arquivo XML',
    field: 'billingAt',
    hozAlign: 'center',
    sorter: 'datetime',
    sorterParams: {
      format: 'YYYY-MM-DD'
    },
    formatter: 'datetime',
    formatterParams: {
      inputFormat: 'YYYY-MM-DD',
      outputFormat: 'DD/MM/YYYY',
      invalidPlaceholder: '-'
    },
    width: 120,
    headerContextMenu: contextMenu
  },
  {
    title: 'Nº Nota Fiscal',
    field: 'invoiceNumber',
    hozAlign: 'right',
    sorter: 'number',
    width: 130,
    headerContextMenu: contextMenu
  },
  {
    title: 'FOB SP',
    field: 'freeOnBoardAt',
    hozAlign: 'center',
    sorter: 'datetime',
    sorterParams: {
      format: 'YYYY-MM-DD'
    },
    formatter: 'datetime',
    formatterParams: {
      inputFormat: 'YYYY-MM-DD',
      outputFormat: 'DD/MM/YYYY',
      invalidPlaceholder: '-'
    },
    width: 100,
    headerContextMenu: contextMenu
  },
  {
    title: 'Prev. Agendamento',
    field: 'schedulingAt',
    hozAlign: 'center',
    sorter: 'datetime',
    sorterParams: {
      format: 'YYYY-MM-DD'
    },
    formatter: 'datetime',
    formatterParams: {
      inputFormat: 'YYYY-MM-DD',
      outputFormat: 'DD/MM/YYYY',
      invalidPlaceholder: '-'
    },
    width: 160,
    headerContextMenu: contextMenu
  },
  {
    title: 'Agendamento',
    field: 'schedule.scheduledAt',
    hozAlign: 'center',
    sorter: 'datetime',
    sorterParams: {
      format: 'YYYY-MM-DD'
    },
    formatter: 'datetime',
    formatterParams: {
      inputFormat: 'YYYY-MM-DD',
      outputFormat: 'DD/MM/YYYY',
      invalidPlaceholder: '-'
    },
    width: 160,
    headerContextMenu: contextMenu
  },
  {
    title: 'Recebimento',
    field: 'schedule.receivedAt',
    hozAlign: 'center',
    sorter: 'datetime',
    sorterParams: {
      format: 'YYYY-MM-DD'
    },
    formatter: 'datetime',
    formatterParams: {
      inputFormat: 'YYYY-MM-DD',
      outputFormat: 'DD/MM/YYYY',
      invalidPlaceholder: '-'
    },
    width: 160,
    headerContextMenu: contextMenu
  },
  {
    title: 'Descarregamento',
    field: 'schedule.downloadedAt',
    hozAlign: 'center',
    sorter: 'datetime',
    sorterParams: {
      format: 'YYYY-MM-DD'
    },
    formatter: 'datetime',
    formatterParams: {
      inputFormat: 'YYYY-MM-DD',
      outputFormat: 'DD/MM/YYYY',
      invalidPlaceholder: '-'
    },
    width: 160,
    headerContextMenu: contextMenu
  },
  {
    title: 'Desbloqueio',
    field: 'schedule.unlockedAt',
    hozAlign: 'center',
    sorter: 'datetime',
    sorterParams: {
      format: 'YYYY-MM-DD'
    },
    formatter: 'datetime',
    formatterParams: {
      inputFormat: 'YYYY-MM-DD',
      outputFormat: 'DD/MM/YYYY',
      invalidPlaceholder: '-'
    },
    width: 160,
    headerContextMenu: contextMenu
  }
]

function excludeColumns(...fields: string[]): ColumnDefinition[] {
  return allColumns.filter(column => {
    const exclude = Boolean(fields.find(field => field === column.field))

    return !exclude
  })
}

export const nonScheduledColumns = excludeColumns(
  'schedule.scheduledAt',
  'schedule.receivedAt',
  'schedule.downloadedAt',
  'schedule.unlockedAt'
)

export const scheduledColumns = excludeColumns(
  'schedule.receivedAt',
  'schedule.downloadedAt',
  'schedule.unlockedAt'
)

export const receivingColumns = excludeColumns(
  'schedule.downloadedAt',
  'schedule.unlockedAt'
)

export const downloadedColumns = excludeColumns('schedule.unlockedAt')

export const unlockedColumns = excludeColumns()
