import React from 'react'
import {
  MdApps,
  MdLocalShipping,
  MdLockOpen,
  MdReceipt,
  MdToday,
  MdVisibility,
  MdVisibilityOff
} from 'react-icons/md'

import { MdPendingAction } from '~/components/Icons'
import { SituationGroupButton } from '~/screens/Accompaniments/InProgress/SituationGroup/Button'
import { Wrapper } from '~/screens/Accompaniments/InProgress/SituationGroup/styles'
import { InProgressTabs } from '~/screens/Accompaniments/InProgress/types'
import {
  useInProgressAccompaniments,
  useNonSendedAccompaniments,
  useNonRevisedAccompaniments,
  useNonReleasedAccompaniments,
  useNonExpectedBillingAccompaniments,
  useNonBilledAccompaniments,
  useNonFreeOnBoardAccompaniments,
  useNonSchedulingAccompaniments
} from '~/store/context'
import {
  Accompaniment,
  CriticalLevel
} from '~/store/modules/accompaniments/types'

function calcDelay(currentCount: number, accompaniment: Accompaniment) {
  if (accompaniment.criticalLevel === CriticalLevel.NORMAL) {
    return currentCount
  }

  return currentCount + 1
}

const InProgressSituationGroup: React.FC = () => {
  const inProgressAccompaniment = useInProgressAccompaniments()
  const nonSendedAccompaniment = useNonSendedAccompaniments()
  const nonReviewedAccompaniment = useNonRevisedAccompaniments()
  const nonReleasedAccompaniment = useNonReleasedAccompaniments()
  const nonExpectedBillingAccompaniment = useNonExpectedBillingAccompaniments()
  const nonBilledAccompaniment = useNonBilledAccompaniments()
  const nonFreeOnBoardAccompaniment = useNonFreeOnBoardAccompaniments()
  const nonSchedulingAccompaniment = useNonSchedulingAccompaniments()

  return (
    <Wrapper>
      <SituationGroupButton
        situation={InProgressTabs.ALL}
        label="Todos"
        icon={<MdApps />}
        delayCount={inProgressAccompaniment.reduce(calcDelay, 0)}
        accompanimentCount={inProgressAccompaniment.length}
      />
      <SituationGroupButton
        situation={InProgressTabs.NON_SENDED}
        label="A Enviar"
        icon={<MdVisibilityOff />}
        delayCount={nonSendedAccompaniment.reduce(calcDelay, 0)}
        accompanimentCount={nonSendedAccompaniment.length}
      />
      <SituationGroupButton
        situation={InProgressTabs.NON_REVISED}
        label="A Revisar"
        icon={<MdVisibility />}
        delayCount={nonReviewedAccompaniment.reduce(calcDelay, 0)}
        accompanimentCount={nonReviewedAccompaniment.length}
      />
      <SituationGroupButton
        situation={InProgressTabs.NON_RELEASED}
        label="A Liberar"
        icon={<MdLockOpen />}
        delayCount={nonReleasedAccompaniment.reduce(calcDelay, 0)}
        accompanimentCount={nonReleasedAccompaniment.length}
      />
      <SituationGroupButton
        situation={InProgressTabs.NON_EXPECTED_BILLING}
        label="A Prever Faturamento"
        icon={<MdPendingAction />}
        delayCount={nonExpectedBillingAccompaniment.reduce(calcDelay, 0)}
        accompanimentCount={nonExpectedBillingAccompaniment.length}
      />
      <SituationGroupButton
        situation={InProgressTabs.NON_BILLED}
        label="A Faturar"
        icon={<MdReceipt />}
        delayCount={nonBilledAccompaniment.reduce(calcDelay, 0)}
        accompanimentCount={nonBilledAccompaniment.length}
      />
      <SituationGroupButton
        situation={InProgressTabs.NON_FREE_ON_BOARD}
        label="A Agendar FOB"
        icon={<MdLocalShipping />}
        delayCount={nonFreeOnBoardAccompaniment.reduce(calcDelay, 0)}
        accompanimentCount={nonFreeOnBoardAccompaniment.length}
      />
      <SituationGroupButton
        situation={InProgressTabs.NON_SCHEDULING}
        label="A Prever Agendamento"
        icon={<MdToday />}
        delayCount={nonSchedulingAccompaniment.reduce(calcDelay, 0)}
        accompanimentCount={nonSchedulingAccompaniment.length}
      />
    </Wrapper>
  )
}

export { InProgressSituationGroup }
