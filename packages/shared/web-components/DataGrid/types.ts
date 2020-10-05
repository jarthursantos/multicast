import { CellProps } from './Body/Row/Cell/types'
import { RowStyle } from './Body/Row/types'
import { FooterCellProps } from './Footer/Cell/types'
import { HeaderCellProps } from './Header/Cell/types'

export interface ContextHandles {
  onRowClick(item: any): void
  onRowDoubleClick(item: any): void
  resolveRowStyle(item: any): React.CSSProperties | undefined
  columns: ColumnProps[]
  data: any[]
  keyBinding: string | number | symbol
}

export interface GridProps {
  style?: React.HTMLAttributes<HTMLDivElement>
}

export interface DataGridProps<Data> extends GridProps {
  data: Data[]
  columns: ColumnProps[]
  keyBinding: keyof Data
  rowStyles?: RowStyle<Data>[]

  onRowClick?(item: Data): void
  onRowDoubleClick?(item: Data): void
  onSelectionChange?(item: Data): void
}

export interface ColumnProps {
  header: HeaderCellProps
  cell: CellProps
  footer?: FooterCellProps
}

export interface SortOrder {
  key: string
  order: 'asc' | 'desc'
}

export interface Indexable {
  index: number
}

export type Aligns = 'center' | 'left' | 'right'

export type RenderType = 'contabil' | 'numeric' | 'text'
