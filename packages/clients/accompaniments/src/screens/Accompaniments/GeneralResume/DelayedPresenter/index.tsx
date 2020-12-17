import React, { useCallback, useContext } from 'react'

import { SectionTimeline } from '~/screens/Accompaniments/GeneralResume/DelayedPresenter/Timeline'
import { Section } from '~/screens/Accompaniments/GeneralResume/styles'
import { HomeScreenContext } from '~/screens/context'
import { AccompanimentTabs } from '~/screens/types'
import {
  useNonBilledAccompaniments,
  useNonExpectedBillingAccompaniments,
  useNonFreeOnBoardAccompaniments,
  useNonReleasedAccompaniments,
  useNonRevisedAccompaniments,
  useNonSchedulingAccompaniments,
  useNonSendedAccompaniments
} from '~/store/context'
import {
  Accompaniment,
  CriticalLevel
} from '~/store/modules/accompaniments/types'

import { InProgressTabs } from '../../InProgress/types'
import { AccompanimentsGeneralResumeProps } from '../types'

function delayComparer(acc: Accompaniment, other: Accompaniment) {
  if (acc.criticalLevel === other.criticalLevel) {
    return other.delay - acc.delay
  }

  if (acc.criticalLevel === CriticalLevel.DANGER) {
    return -1
  }

  if (other.criticalLevel === CriticalLevel.DANGER) {
    return 1
  }

  if (acc.criticalLevel === CriticalLevel.ALERT) {
    return -1
  }

  if (other.criticalLevel === CriticalLevel.ALERT) {
    return 1
  }
}

const GeneralResumeDelayedPresenter: React.VFC<AccompanimentsGeneralResumeProps> = ({
  changeCurrentInProgressTab
}) => {
  const nonSended = useNonSendedAccompaniments()
  const nonRevised = useNonRevisedAccompaniments()
  const nonReleased = useNonReleasedAccompaniments()
  const nonExpectedBilling = useNonExpectedBillingAccompaniments()
  const nonBilled = useNonBilledAccompaniments()
  const nonFreeOnBoard = useNonFreeOnBoardAccompaniments()
  const nonScheduling = useNonSchedulingAccompaniments()

  const { changeAccompanimentTab } = useContext(HomeScreenContext)

  const handleGoTo = useCallback(
    (tab: InProgressTabs) => {
      return () => {
        changeAccompanimentTab(AccompanimentTabs.IN_PROGRESS)
        changeCurrentInProgressTab(tab)
      }
    },
    [changeAccompanimentTab, changeCurrentInProgressTab]
  )

  return (
    <React.Fragment>
      <Section>
        <h2>Acompanhamentos em atraso</h2>

        <div style={{ height: 24 }} />

        {nonSended.length > 0 && (
          <React.Fragment>
            <h3 onClick={handleGoTo(InProgressTabs.NON_SENDED)}>A Enviar</h3>
            <SectionTimeline
              accompaniments={nonSended.splice(0, 5).sort(delayComparer)}
            />
            <div style={{ height: 48 }} />
          </React.Fragment>
        )}

        {nonRevised.length > 0 && (
          <React.Fragment>
            <h3 onClick={handleGoTo(InProgressTabs.NON_REVISED)}>A Revisar</h3>
            <SectionTimeline
              accompaniments={nonRevised.splice(0, 5).sort(delayComparer)}
            />
            <div style={{ height: 48 }} />
          </React.Fragment>
        )}

        {nonReleased.length > 0 && (
          <React.Fragment>
            <h3 onClick={handleGoTo(InProgressTabs.NON_RELEASED)}>A Liberar</h3>
            <SectionTimeline
              accompaniments={nonReleased.splice(0, 5).sort(delayComparer)}
            />
            <div style={{ height: 48 }} />
          </React.Fragment>
        )}

        {nonExpectedBilling.length > 0 && (
          <React.Fragment>
            <h3 onClick={handleGoTo(InProgressTabs.NON_EXPECTED_BILLING)}>
              A Prever Faturamento
            </h3>
            <SectionTimeline
              accompaniments={nonExpectedBilling
                .splice(0, 5)
                .sort(delayComparer)}
            />
            <div style={{ height: 48 }} />
          </React.Fragment>
        )}

        {nonBilled.length > 0 && (
          <React.Fragment>
            <h3 onClick={handleGoTo(InProgressTabs.NON_BILLED)}>A Faturar</h3>
            <SectionTimeline
              accompaniments={nonBilled.splice(0, 5).sort(delayComparer)}
            />
            <div style={{ height: 48 }} />
          </React.Fragment>
        )}

        {nonFreeOnBoard.length > 0 && (
          <React.Fragment>
            <h3 onClick={handleGoTo(InProgressTabs.NON_FREE_ON_BOARD)}>
              A Agendar FOB
            </h3>
            <SectionTimeline
              accompaniments={nonFreeOnBoard.splice(0, 5).sort(delayComparer)}
            />
            <div style={{ height: 48 }} />
          </React.Fragment>
        )}

        {nonScheduling.length > 0 && (
          <React.Fragment>
            <h3 onClick={handleGoTo(InProgressTabs.NON_SCHEDULING)}>
              A Prever Agendamento
            </h3>
            <SectionTimeline
              accompaniments={nonScheduling.splice(0, 5).sort(delayComparer)}
            />
            <div style={{ height: 48 }} />
          </React.Fragment>
        )}
      </Section>
    </React.Fragment>
  )
}

export { GeneralResumeDelayedPresenter }
