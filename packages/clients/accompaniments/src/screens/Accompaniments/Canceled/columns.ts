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
  //, {
  //   label: 'Ocultar',
  //   action: (_, column) => {
  //     column.hide()
  //   }
  // }
]

export const columns: ColumnDefinition[] = [
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
    title: 'Cancelamento',
    field: 'canceledAt',
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
