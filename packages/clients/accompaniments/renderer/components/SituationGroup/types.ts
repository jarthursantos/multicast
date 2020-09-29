import { ReactElement } from 'react'

import { SituationGroupButtonProps } from './Button/types'

export interface SituationGroupProps {
  initialGroup?: string
  onGroupChange?(name: string): void
  children:
    | ReactElement<SituationGroupButtonProps>
    | ReactElement<SituationGroupButtonProps>[]
}
