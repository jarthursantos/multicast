import { CellProps } from './Cell/types'

export interface RowProps {
  id: string
  data: { [key: string]: any }
}

export interface RowStyle<Data> {
  key: keyof Data
  where: ConditionalStyle[]
}

export interface ConditionalStyle {
  value: any
  style: React.CSSProperties
}
