import { ReactElement } from 'react'

import { InReceivementTabs } from '../../types'

export interface SituationGroupButtonProps {
  situation: InReceivementTabs
  icon: ReactElement
  label: string
  accompanimentCount: number
  delayCount: number
}
