import { ColumnProps } from './Body/Column/types'
import { RowStyle } from './Body/Row/types'

export interface ContextHandles {
  resolveRowStyle(item: any): React.CSSProperties | undefined
  columns: ColumnProps[]
  data: any[]
  keyBinding: string | number | symbol
}

export interface DataGridProps<Data> {
  data: Data[]
  columns: ColumnProps[]
  keyBinding: keyof Data
  rowStyles?: RowStyle<Data>[]
  style?: React.HTMLAttributes<HTMLDivElement>

  onRowClick?(item: Data): void
  onRowDoubleClick?(item: Data): void
  onSelectionChange?(item: Data): void
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
