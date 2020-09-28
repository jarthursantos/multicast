import { Aligns, Indexable } from '../../../types'

export interface RowCellProps extends Indexable {
  value: any
  cell: CellProps
}

export type CellProps =
  | ContabilCell
  | TextCell
  | DateCell
  | NumberCell
  | BooleanCell
interface CellBaseProps {
  path: string
}

export enum CellType {
  CONTABIL = 'CONTABIL',
  TEXT = 'TEXT',
  NUMBER = 'NUMBER',
  DATE = 'DATE',
  BOOLEAN = 'BOOLEAN'
}

interface AlignCellBaseProps extends CellBaseProps {
  align?: Aligns
}

export interface ContabilCell extends CellBaseProps {
  type: typeof CellType.CONTABIL
}

export interface TextCell extends AlignCellBaseProps {
  type: typeof CellType.TEXT
  translate?(value: string): string
}

export interface DateCell extends CellBaseProps {
  type: typeof CellType.DATE
  includeTime?: boolean
}

export interface NumberCell extends CellBaseProps {
  type: typeof CellType.NUMBER
  fractionDigits?: number
}

export interface BooleanCell extends CellBaseProps {
  type: typeof CellType.BOOLEAN
  positiveValue: string
  negativeValue: string
}
