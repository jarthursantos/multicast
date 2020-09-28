import { ReactElement } from 'react'

import { TabBarProps } from '../TabBar/types'
import { TabContentContainerProps } from '../TabContentContainer/types'
import { TabOptionsProps } from '../TabOptions/types'

export interface RibbonProps {
  children: [
    ReactElement<TabBarProps>,
    ReactElement<TabOptionsProps>,
    ReactElement<TabContentContainerProps>
  ]
}
