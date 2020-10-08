import { CellType } from '@shared/web-components/DataGrid/Body/Row/Cell/types'
import { ColumnProps } from '@shared/web-components/DataGrid/types'

export const columns: ColumnProps[] = [
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
      title: 'Dia da Semana',
      width: 120,
      align: 'center'
    },
    cell: {
      type: CellType.TEXT,
      path: 'weekDay'
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
      title: '%',
      width: 70,
      align: 'center'
    },
    cell: {
      type: CellType.NUMBER,
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
  }
]
