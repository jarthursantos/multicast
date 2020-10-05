import { CellType } from '@shared/web-components/DataGrid/Body/Row/Cell/types'
import { ColumnProps } from '@shared/web-components/DataGrid/types'

import { allAccompanimentsColumns } from '~/pages/InProgress/columns'

const columns: ColumnProps[] = [
  ...allAccompanimentsColumns,
  {
    header: {
      title: 'Agendamento',
      width: 120,
      align: 'center'
    },
    cell: {
      type: CellType.DATE,
      path: 'schedule.scheduledAt'
    }
  },
  {
    header: {
      title: 'Recebimento',
      width: 120,
      align: 'center'
    },
    cell: {
      type: CellType.DATE,
      path: 'schedule.receivedAt'
    }
  },
  {
    header: {
      title: 'Descarregamento',
      width: 140,
      align: 'center'
    },
    cell: {
      type: CellType.DATE,
      path: 'schedule.downloadedAt'
    }
  },
  {
    header: {
      title: 'Desbloqueio',
      width: 120,
      align: 'center'
    },
    cell: {
      type: CellType.DATE,
      path: 'schedule.unlockedAt'
    }
  }
]

export const scheduledColumns: ColumnProps[] = excludeColumns(
  'schedule.receivedAt',
  'schedule.downloadedAt',
  'schedule.unlockedAt'
)

export const receivingColumns: ColumnProps[] = excludeColumns(
  'schedule.downloadedAt',
  'schedule.unlockedAt'
)

export const downloadedColumns: ColumnProps[] = excludeColumns(
  'schedule.unlockedAt'
)

export const unlockedColumns: ColumnProps[] = excludeColumns()

function excludeColumns(...paths: string[]): ColumnProps[] {
  return columns.filter(column => {
    const exclude = Boolean(paths.find(path => path === column.cell.path))

    return !exclude
  })
}
