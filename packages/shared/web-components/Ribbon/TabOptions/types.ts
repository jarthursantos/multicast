import { ReactElement } from 'react'

import { TabOptionsContentProps } from './TabOptionsContent/types'

export interface TabOptionsProps {
  children:
    | ReactElement<TabOptionsContentProps>
    | ReactElement<TabOptionsContentProps>[]
}
