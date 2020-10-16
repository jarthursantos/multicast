import { CellProps } from './Body/Row/Cell/types'
import { FooterCellProps } from './Footer/Cell/types'
import { HeaderCellProps } from './Header/Cell/types'

export interface ContextHandles {
  onRowClick(item: any): void
  onRowDoubleClick(item: any): void
  resolveRowStyle(item: any): React.CSSProperties | undefined
  keyExtractor(data: any): string
  columns: ColumnProps[]
  data: any[]
  selectedRow: string | undefined
  onSelectionChange?(item: any): void
}

export interface GridProps {
  style?: React.HTMLAttributes<HTMLDivElement>
}

export interface DataGridProps<Data> extends GridProps {
  data: Data[]
  columns: ColumnProps[]
  keyExtractor(data: Data): string
  resolveRowStyle(item: Data): React.CSSProperties | undefined

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
