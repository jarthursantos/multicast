import { FooterCellProps } from '../../Footer/Cell/types'
import { HeaderCellProps } from '../../Header/Cell/types'
import { CellProps } from '../Row/Cell/types'

export interface ColumnProps {
  header: HeaderCellProps
  cell: CellProps
  footer?: FooterCellProps
}
