import { ReactElement } from 'react'

import { InProgressTabs } from '~/screens/Accompaniments/InProgress/types'

export interface SituationGroupButtonProps {
  situation: InProgressTabs
  icon: ReactElement
  label: string
  accompanimentCount: number
  delayCount: number
}
