import { ReactElement } from 'react'

import { GroupButtonProps } from './GroupButton/types'

export interface ButtonGroupProps {
  currentButton: string
  onSelectionChange?(name: string): void
  children: ReactElement<GroupButtonProps> | ReactElement<GroupButtonProps>[]
}
