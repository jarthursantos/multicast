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

import { InProgressTabs } from '../../InProgress/types'
import { AccompanimentsGeneralResumeProps } from '../types'

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

        <div style={{ height: 16 }} />

        {nonSended.length > 0 && (
          <React.Fragment>
            <h3 onClick={handleGoTo(InProgressTabs.NON_SENDED)}>A Enviar</h3>

            <SectionTimeline
              accompaniments={nonSended}
              onShowMoreClick={handleGoTo(InProgressTabs.NON_SENDED)}
            />
          </React.Fragment>
        )}

        {nonRevised.length > 0 && (
          <React.Fragment>
            <h3 onClick={handleGoTo(InProgressTabs.NON_REVISED)}>A Revisar</h3>

            <SectionTimeline
              accompaniments={nonRevised}
              onShowMoreClick={handleGoTo(InProgressTabs.NON_REVISED)}
            />
          </React.Fragment>
        )}

        {nonReleased.length > 0 && (
          <React.Fragment>
            <h3 onClick={handleGoTo(InProgressTabs.NON_RELEASED)}>A Liberar</h3>

            <SectionTimeline
              accompaniments={nonReleased}
              onShowMoreClick={handleGoTo(InProgressTabs.NON_RELEASED)}
            />
          </React.Fragment>
        )}

        {nonExpectedBilling.length > 0 && (
          <React.Fragment>
            <h3 onClick={handleGoTo(InProgressTabs.NON_EXPECTED_BILLING)}>
              A Prever Faturamento
            </h3>

            <SectionTimeline
              accompaniments={nonExpectedBilling}
              onShowMoreClick={handleGoTo(InProgressTabs.NON_EXPECTED_BILLING)}
            />
          </React.Fragment>
        )}

        {nonBilled.length > 0 && (
          <React.Fragment>
            <h3 onClick={handleGoTo(InProgressTabs.NON_BILLED)}>A Faturar</h3>

            <SectionTimeline
              accompaniments={nonBilled}
              onShowMoreClick={handleGoTo(InProgressTabs.NON_BILLED)}
            />
          </React.Fragment>
        )}

        {nonFreeOnBoard.length > 0 && (
          <React.Fragment>
            <h3 onClick={handleGoTo(InProgressTabs.NON_FREE_ON_BOARD)}>
              A Agendar FOB
            </h3>

            <SectionTimeline
              accompaniments={nonFreeOnBoard}
              onShowMoreClick={handleGoTo(InProgressTabs.NON_FREE_ON_BOARD)}
            />
          </React.Fragment>
        )}

        {nonScheduling.length > 0 && (
          <React.Fragment>
            <h3 onClick={handleGoTo(InProgressTabs.NON_SCHEDULING)}>
              A Prever Agendamento
            </h3>

            <SectionTimeline
              accompaniments={nonScheduling}
              onShowMoreClick={handleGoTo(InProgressTabs.NON_SCHEDULING)}
            />
          </React.Fragment>
        )}
      </Section>
    </React.Fragment>
  )
}

export { GeneralResumeDelayedPresenter }
