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
      type: CellType.NUMBER
    }
  },
  {
    header: {
      title: 'Descrição',
      width: 111
    },
    cell: {
      path: 'description',
      type: CellType.TEXT
    }
  },
  {
    header: {
      title: 'Qtd.',
      width: 60,
      align: 'center'
    },
    cell: {
      path: 'requestedQuantity',
      type: CellType.NUMBER
    }
  }
]
