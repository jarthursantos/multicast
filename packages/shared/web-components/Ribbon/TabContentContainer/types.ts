import { ReactElement } from 'react'

import { TabContentProps } from '../TabContent/types'

export interface TabContentContainerProps {
  children: ReactElement<TabContentProps> | ReactElement<TabContentProps>[]
}
