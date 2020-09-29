import { CellType } from '@shared/web-components/DataGrid/Body/Row/Cell/types'
import { ColumnProps } from '@shared/web-components/DataGrid/types'

export const allAccompanimentsColumns: ColumnProps[] = [
  {
    header: {
      title: 'Nº Pedido',
      width: 100,
      align: 'center'
    },
    cell: {
      path: 'number',
      type: CellType.NUMBER
    },
    footer: {
      value: '1',
      align: 'right'
    }
  },
  {
    header: {
      title: 'Cód. Fornec.',
      width: 120,
      align: 'center'
    },
    cell: {
      type: CellType.NUMBER,
      path: 'provider.code'
    }
  },
  {
    header: {
      title: 'Fornecedor',
      width: 250,
      align: 'left'
    },
    cell: {
      type: CellType.TEXT,
      path: 'provider.name',
      align: 'left'
    }
  },
  {
    header: {
      title: 'Emissão',
      width: 100,
      align: 'center'
    },
    cell: {
      type: CellType.DATE,
      path: 'emittedAt'
    }
  },
  {
    header: {
      title: 'Atraso (Dias)',
      width: 110,
      align: 'center'
    },
    cell: {
      type: CellType.NUMBER,
      path: 'delay'
    }
  },
  {
    header: {
      title: 'Marca',
      width: 150,
      align: 'center'
    },
    cell: {
      type: CellType.TEXT,
      path: 'fantasy',
      align: 'center'
    }
  },
  {
    header: {
      title: 'Valor Total',
      width: 120,
      align: 'center'
    },
    cell: {
      type: CellType.CONTABIL,
      path: 'amountValue'
    },
    footer: {
      value: 'R$ 1.000,00',
      align: 'right',
      type: 'contabil'
    }
  },
  {
    header: {
      title: 'Comprador',
      width: 250,
      align: 'left'
    },
    cell: {
      type: CellType.TEXT,
      path: 'buyer.name',
      align: 'left'
    }
  },
  {
    header: {
      title: 'Transportadora',
      width: 250,
      align: 'left'
    },
    cell: {
      type: CellType.TEXT,
      path: 'shippingName',
      align: 'left'
    }
  },
  {
    header: {
      title: 'Frete',
      width: 80,
      align: 'center'
    },
    cell: {
      type: CellType.TEXT,
      path: 'freight',
      align: 'center'
    }
  },
  {
    header: {
      title: 'Revisão',
      width: 100,
      align: 'center'
    },
    cell: {
      type: CellType.DATE,
      path: 'reviewedAt'
    }
  },
  {
    header: {
      title: 'Liberação',
      width: 100,
      align: 'center'
    },
    cell: {
      type: CellType.DATE,
      path: 'unlockedAt'
    }
  },
  {
    header: {
      title: 'Prev. Faturamento',
      width: 140,
      align: 'center'
    },
    cell: {
      type: CellType.DATE,
      path: 'estimatedBilling'
    }
  },
  {
    header: {
      title: 'Arq. XML',
      width: 100,
      align: 'center'
    },
    cell: {
      type: CellType.DATE,
      path: 'xmlFileAt'
    }
  },
  {
    header: {
      title: 'Nº Nota Fiscal',
      width: 110,
      align: 'center'
    },
    cell: {
      type: CellType.NUMBER,
      path: 'invoiceNumber'
    }
  },
  {
    header: {
      title: 'FOB SP',
      width: 100,
      align: 'center'
    },
    cell: {
      type: CellType.DATE,
      path: 'fobAt'
    }
  },
  {
    header: {
      title: 'Prev. Agendamento',
      width: 140,
      align: 'center'
    },
    cell: {
      type: CellType.DATE,
      path: 'schedulingForecastAt'
    }
  }
]

export const nonRevisedColumns: ColumnProps[] = excludeColumns(
  'reviewedAt',
  'unlockedAt',
  'estimatedBilling',
  'xmlFileAt',
  'invoiceNumber',
  'fobAt',
  'schedulingForecastAt'
)

export const revisedColumns: ColumnProps[] = excludeColumns(
  'unlockedAt',
  'estimatedBilling',
  'xmlFileAt',
  'invoiceNumber',
  'fobAt',
  'schedulingForecastAt'
)

export const unlockedColumns: ColumnProps[] = excludeColumns(
  'reviewedAt',
  'estimatedBilling',
  'xmlFileAt',
  'invoiceNumber',
  'fobAt',
  'schedulingForecastAt'
)

function excludeColumns(...paths: string[]): ColumnProps[] {
  return allAccompanimentsColumns.filter(column => {
    const exclude = Boolean(paths.find(path => path === column.cell.path))

    return !exclude
  })
}
