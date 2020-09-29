import { CellType } from '@shared/web-components/DataGrid/Body/Row/Cell/types'
import { ColumnProps } from '@shared/web-components/DataGrid/types'

export const columns: ColumnProps[] = [
  {
    header: {
      title: 'Código',
      width: 80,
      align: 'center'
    },
    cell: {
      path: 'code',
      type: CellType.TEXT,
      align: 'right'
    }
  },
  {
    header: {
      title: 'Descrição',
      width: 111,
      align: 'center'
    },
    cell: {
      path: 'description',
      type: CellType.TEXT,
      align: 'right'
    }
  },
  {
    header: {
      title: 'Quantidate',
      width: 100,
      align: 'center'
    },
    cell: {
      path: 'quantity',
      type: CellType.TEXT,
      align: 'right'
    }
  }
]
