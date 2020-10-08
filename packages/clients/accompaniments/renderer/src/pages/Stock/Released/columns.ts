import { CellType } from '@shared/web-components/DataGrid/Body/Row/Cell/types'
import { ColumnProps } from '@shared/web-components/DataGrid/types'

import { productColumns } from '../columns'

export const columns: ColumnProps[] = [
  {
    header: {
      title: 'Recebimento',
      width: 100,
      align: 'center'
    },
    cell: {
      type: CellType.DATE,
      path: 'arrivedAt'
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
      path: 'arrivedAt'
    }
  },
  ...productColumns
]
