import React, { createContext, useMemo } from 'react'

import { RepresentativityContextHandles } from '~/screens/Accompaniments/GeneralResume/Representativity/types'
import {
  useNonBilledAccompaniments,
  useNonExpectedBillingAccompaniments,
  useNonFreeOnBoardAccompaniments,
  useNonReleasedAccompaniments,
  useNonRevisedAccompaniments,
  useNonSchedulingAccompaniments,
  useNonSendedAccompaniments
} from '~/store/context'

import { AccompanimentsGeneralResumeProps } from '../types'

export const RepresentativityContext = createContext<
  RepresentativityContextHandles
>(undefined)

const RepresentativityContextProvider: React.FC<AccompanimentsGeneralResumeProps> = ({
  children,
  changeCurrentInProgressTab
}) => {
  const nonSended = useNonSendedAccompaniments()
  const nonRevised = useNonRevisedAccompaniments()
  const nonReleased = useNonReleasedAccompaniments()
  const nonExpectedBilling = useNonExpectedBillingAccompaniments()
  const nonBilled = useNonBilledAccompaniments()
  const nonFreeOnBoard = useNonFreeOnBoardAccompaniments()
  const nonScheduling = useNonSchedulingAccompaniments()

  const countData = useMemo(() => {
    return [
      nonSended.length,
      nonRevised.length,
      nonReleased.length,
      nonExpectedBilling.length,
      nonBilled.length,
      nonFreeOnBoard.length,
      nonScheduling.length
    ]
  }, [
    nonSended,
    nonRevised,
    nonReleased,
    nonExpectedBilling,
    nonBilled,
    nonFreeOnBoard,
    nonScheduling
  ])

  const amountData = useMemo(() => {
    return [
      nonSended.reduce(
        (curr, { purchaseOrder: { amountValue } }) => curr + amountValue,
        0
      ),
      nonRevised.reduce(
        (curr, { purchaseOrder: { amountValue } }) => curr + amountValue,
        0
      ),
      nonReleased.reduce(
        (curr, { purchaseOrder: { amountValue } }) => curr + amountValue,
        0
      ),
      nonExpectedBilling.reduce(
        (curr, { purchaseOrder: { amountValue } }) => curr + amountValue,
        0
      ),
      nonBilled.reduce(
        (curr, { purchaseOrder: { amountValue } }) => curr + amountValue,
        0
      ),
      nonFreeOnBoard.reduce(
        (curr, { purchaseOrder: { amountValue } }) => curr + amountValue,
        0
      ),
      nonScheduling.reduce(
        (curr, { purchaseOrder: { amountValue } }) => curr + amountValue,
        0
      )
    ]
  }, [
    nonSended,
    nonRevised,
    nonReleased,
    nonExpectedBilling,
    nonBilled,
    nonFreeOnBoard,
    nonScheduling
  ])

  const deliveredData = useMemo(() => {
    return [
      nonRevised.reduce(
        (curr, { purchaseOrder: { deliveredValue } }) => curr + deliveredValue,
        0
      ),
      nonSended.reduce(
        (curr, { purchaseOrder: { deliveredValue } }) => curr + deliveredValue,
        0
      ),
      nonReleased.reduce(
        (curr, { purchaseOrder: { deliveredValue } }) => curr + deliveredValue,
        0
      ),
      nonExpectedBilling.reduce(
        (curr, { purchaseOrder: { deliveredValue } }) => curr + deliveredValue,
        0
      ),
      nonBilled.reduce(
        (curr, { purchaseOrder: { deliveredValue } }) => curr + deliveredValue,
        0
      ),
      nonFreeOnBoard.reduce(
        (curr, { purchaseOrder: { deliveredValue } }) => curr + deliveredValue,
        0
      ),
      nonScheduling.reduce(
        (curr, { purchaseOrder: { deliveredValue } }) => curr + deliveredValue,
        0
      )
    ]
  }, [
    nonSended,
    nonRevised,
    nonReleased,
    nonExpectedBilling,
    nonBilled,
    nonFreeOnBoard,
    nonScheduling
  ])

  return (
    <RepresentativityContext.Provider
      value={{
        countData,
        amountData,
        deliveredData,
        changeCurrentInProgressTab
      }}
    >
      {children}
    </RepresentativityContext.Provider>
  )
}

export { RepresentativityContextProvider }
