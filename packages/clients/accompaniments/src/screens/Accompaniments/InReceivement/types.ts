import { Dispatch, ReactNode, SetStateAction } from 'react'

export interface InReceivementScreenContextHandles {
  currentSituation: InReceivementTabs
  isSituationActive(situation: InReceivementTabs): boolean
  setCurrentActiveSituation: Dispatch<SetStateAction<InReceivementTabs>>
}

export interface AccompanimentsInReceivementScreenProps {
  initialSituation?: InReceivementTabs
  onChange?(situation: InReceivementTabs): void
  children: ReactNode
}

export interface AccompanimentsInReceivementComponentHandles {
  changeCurrentTab(tab: InReceivementTabs): void
}

export enum InReceivementTabs {
  NON_SCHEDULED = 'NON_SCHEDULED',
  SCHEDULED = 'SCHEDULED',
  RECEIVED = 'RECEIVED',
  DOWNLOADED = 'DOWNLOADED',
  UNLOCKED = 'UNLOCKED'
}
