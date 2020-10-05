import React, { createContext, useContext } from 'react'

import { useTypedSelector } from '.'
import { Accompaniment } from './modules/accompaniments/types'

const StoreContext = createContext<{ accompaniments: Accompaniment[] }>(null)

export const StoreContextProvider: React.FC = ({ children }) => {
  const { accompaniments } = useTypedSelector(state => state.accompaniments)

  return (
    <StoreContext.Provider value={{ accompaniments }}>
      {children}
    </StoreContext.Provider>
  )
}

export function useInProgressAccompaniments() {
  const { accompaniments } = useContext(StoreContext)

  return accompaniments
}

export function useNonRevisedAccompaniments() {
  const { accompaniments } = useContext(StoreContext)

  return accompaniments.filter(accompaniment => accompaniment.sendedAt === null)
}

export function useRevisedAccompaniments() {
  const { accompaniments } = useContext(StoreContext)

  return accompaniments.filter(
    accompaniment =>
      accompaniment.sendedAt !== null && accompaniment.reviewedAt === null
  )
}

export function useReleasedAccompaniments() {
  const { accompaniments } = useContext(StoreContext)

  return accompaniments.filter(
    accompaniment =>
      accompaniment.reviewedAt !== null && accompaniment.releasedAt === null
  )
}

export function useExpectedBillingAccompaniments() {
  const { accompaniments } = useContext(StoreContext)

  return accompaniments.filter(
    accompaniment =>
      accompaniment.releasedAt !== null &&
      accompaniment.expectedBillingAt === null
  )
}

export function useBilledAccompaniments() {
  const { accompaniments } = useContext(StoreContext)

  return accompaniments.filter(
    accompaniment =>
      accompaniment.expectedBillingAt !== null &&
      accompaniment.billingAt === null
  )
}

export function useFreeOnBoardAccompaniments() {
  const { accompaniments } = useContext(StoreContext)

  return accompaniments.filter(
    accompaniment =>
      accompaniment.billingAt !== null &&
      accompaniment.freeOnBoardAt === null &&
      accompaniment.purchaseOrder.freight === 'FOB'
  )
}

export function useSchedulingAccompaniments() {
  const { accompaniments } = useContext(StoreContext)

  return accompaniments.filter(
    accompaniment =>
      accompaniment.freeOnBoardAt !== null &&
      accompaniment.schedulingAt === null
  )
}

export function useScheduledAccompaniments() {
  const { accompaniments } = useContext(StoreContext)

  return accompaniments.filter(
    accompaniment => accompaniment.schedulingAt !== null
  )
}

export function useReceivingAccompaniments() {
  const { accompaniments } = useContext(StoreContext)

  return accompaniments.filter(
    accompaniment => accompaniment.schedulingAt !== null
  )
}

export function useDownloadedAccompaniments() {
  const { accompaniments } = useContext(StoreContext)

  return accompaniments.filter(
    accompaniment => accompaniment.schedulingAt !== null
  )
}

export function useUnlockedAccompaniments() {
  const { accompaniments } = useContext(StoreContext)

  return accompaniments.filter(
    accompaniment => accompaniment.schedulingAt !== null
  )
}
