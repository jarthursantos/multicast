import { CellType } from '@shared/web-components/DataGrid/Body/Row/Cell/types'
import { ColumnProps } from '@shared/web-components/DataGrid/types'

export const invoiceColumns: ColumnProps[] = [
  {
    header: {
      title: 'Nº Nota Fiscal',
      width: 120,
      align: 'center'
    },
    cell: {
      type: CellType.NUMBER,
      path: 'number'
    }
  },
  {
    header: {
      title: 'Espécie',
      width: 100,
      align: 'center'
    },
    cell: {
      type: CellType.TEXT,
      path: 'number',
      align: 'center'
    }
  },
  {
    header: {
      title: 'Série',
      width: 100,
      align: 'center'
    },
    cell: {
      type: CellType.TEXT,
      path: 'number',
      align: 'center'
    }
  },
  {
    header: {
      title: 'Saída',
      width: 100,
      align: 'center'
    },
    cell: {
      type: CellType.DATE,
      path: 'number'
    }
  },
  {
    header: {
      title: 'Qt. Nota Fiscal',
      width: 120,
      align: 'center'
    },
    cell: {
      type: CellType.NUMBER,
      path: 'number'
    }
  },
  {
    header: {
      title: 'Valor Entrada',
      width: 120,
      align: 'center'
    },
    cell: {
      type: CellType.CONTABIL,
      path: 'number'
    }
  },
  {
    header: {
      title: 'Peso Total (kg)',
      width: 120,
      align: 'center'
    },
    cell: {
      type: CellType.NUMBER,
      path: 'number'
    }
  },
  {
    header: {
      title: 'Prazo Médio',
      width: 120,
      align: 'center'
    },
    cell: {
      type: CellType.NUMBER,
      path: 'number'
    }
  }
]
