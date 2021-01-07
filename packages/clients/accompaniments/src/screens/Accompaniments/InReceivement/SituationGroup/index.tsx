import React from 'react'
import {
  MdEventBusy,
  MdSystemUpdateAlt,
  MdAssignmentTurnedIn,
  MdEventAvailable,
  MdLockOpen
} from 'react-icons/md'

import {
  useNonScheduledAccompaniments,
  useScheduledAccompaniments,
  useReceivingAccompaniments,
  useDownloadedAccompaniments,
  useUnlockedAccompaniments
} from '~/store/context'
import {
  Accompaniment,
  CriticalLevel
} from '~/store/modules/accompaniments/types'

import { SituationGroupButton } from '../SituationGroup/Button'
import { Wrapper } from '../SituationGroup/styles'
import { InReceivementTabs } from '../types'

function calcDelay(currentCount: number, accompaniment: Accompaniment) {
  if (accompaniment.criticalLevel === CriticalLevel.NORMAL) {
    return currentCount
  }

  return currentCount + 1
}

const ReceivementSituationGroup: React.FC = () => {
  const nonScheduledAccompaniments = useNonScheduledAccompaniments()
  const scheduledAccompaniment = useScheduledAccompaniments()
  const receivingAccompaniment = useReceivingAccompaniments()
  const downloadedAccompaniment = useDownloadedAccompaniments()
  const unlocedAccompaniments = useUnlockedAccompaniments()

  return (
    <Wrapper>
      <SituationGroupButton
        situation={InReceivementTabs.NON_SCHEDULED}
        label="Não Agendados"
        icon={<MdEventBusy />}
        delayCount={nonScheduledAccompaniments.reduce(calcDelay, 0)}
        accompanimentCount={nonScheduledAccompaniments.length}
      />
      <SituationGroupButton
        situation={InReceivementTabs.SCHEDULED}
        label="Agendados"
        icon={<MdEventAvailable />}
        delayCount={scheduledAccompaniment.reduce(calcDelay, 0)}
        accompanimentCount={scheduledAccompaniment.length}
      />
      <SituationGroupButton
        situation={InReceivementTabs.RECEIVED}
        label="Recebidos"
        icon={<MdAssignmentTurnedIn />}
        delayCount={receivingAccompaniment.reduce(calcDelay, 0)}
        accompanimentCount={receivingAccompaniment.length}
      />
      <SituationGroupButton
        situation={InReceivementTabs.DOWNLOADED}
        label="Descarregados"
        icon={<MdSystemUpdateAlt />}
        delayCount={downloadedAccompaniment.reduce(calcDelay, 0)}
        accompanimentCount={downloadedAccompaniment.length}
      />
      <SituationGroupButton
        situation={InReceivementTabs.UNLOCKED}
        label="Desbloqueados"
        icon={<MdLockOpen />}
        delayCount={unlocedAccompaniments.reduce(calcDelay, 0)}
        accompanimentCount={unlocedAccompaniments.length}
      />
    </Wrapper>
  )
}

export { ReceivementSituationGroup }
