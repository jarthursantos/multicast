import { ReactElement } from 'react'

import { GroupButtonProps } from './GroupButton/types'

export interface ButtonGroupProps {
  initialButton: string
  onSelectionChange?(name: string): void
  children: ReactElement<GroupButtonProps> | ReactElement<GroupButtonProps>[]
}
