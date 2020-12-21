import { Dispatch, ReactNode, SetStateAction } from 'react'

export interface InProgressScreenContextHandles {
  currentSituation: InProgressTabs
  isSituationActive(situation: InProgressTabs): boolean
  setCurrentActiveSituation: Dispatch<SetStateAction<InProgressTabs>>
}

export interface InProgressScreenProps {
  initialSituation?: InProgressTabs
  onChange?(situation: InProgressTabs): void
  children: ReactNode
}

export interface AccompanimentsInProgressComponentHandles {
  changeCurrentTab(tab: InProgressTabs): void
}

export enum InProgressTabs {
  ALL = 'ALL',
  NON_SENDED = 'NON_SENDED',
  NON_REVISED = 'NON_REVISED',
  NON_RELEASED = 'NON_RELEASED',
  NON_EXPECTED_BILLING = 'NON_EXPECTED_BILLING',
  NON_BILLED = 'NON_BILLED',
  NON_FREE_ON_BOARD = 'NON_FREE_ON_BOARD',
  NON_SCHEDULING = 'NON_SCHEDULING'
}
