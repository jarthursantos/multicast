import { ReactElement } from 'react'

import { TabBarButtonProps } from './TabBarButton/types'

export interface TabBarProps {
  initialTab: string
  children: ReactElement<TabBarButtonProps> | ReactElement<TabBarButtonProps>[]
}
