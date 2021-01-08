import React, { createContext, useContext, useMemo } from 'react'

import { isAfter, isBefore, parseISO } from 'date-fns'

import { useTypedSelector } from '~/store'
import { Accompaniment } from '~/store/modules/accompaniments/types'

const StoreContext = createContext<{ accompaniments: Accompaniment[] }>(null)

export const StoreContextProvider: React.FC = ({ children }) => {
  const { accompaniments, filters } = useTypedSelector(
    state => state.accompaniments
  )

  const filteredAccompaniments = useMemo(
    () =>
      accompaniments.filter(accompaniment => {
        if (
          filters.emittedFrom &&
          isBefore(
            typeof accompaniment.purchaseOrder.emittedAt === 'string'
              ? parseISO(accompaniment.purchaseOrder.emittedAt)
              : accompaniment.purchaseOrder.emittedAt,
            filters.emittedFrom
          )
        ) {
          return false
        }

        if (
          filters.emittedTo &&
          isAfter(
            typeof accompaniment.purchaseOrder.emittedAt === 'string'
              ? parseISO(accompaniment.purchaseOrder.emittedAt)
              : accompaniment.purchaseOrder.emittedAt,
            filters.emittedTo
          )
        ) {
          return false
        }

        if (
          filters.numberFrom &&
          accompaniment.purchaseOrder.number < filters.numberFrom
        ) {
          return false
        }

        if (
          filters.numberTo &&
          accompaniment.purchaseOrder.number > filters.numberTo
        ) {
          return false
        }

        if (
          filters.providerCode &&
          accompaniment.purchaseOrder.provider.code !== filters.providerCode
        ) {
          return false
        }

        if (
          filters.buyerCode &&
          accompaniment.purchaseOrder.buyer.code !== filters.buyerCode
        ) {
          return false
        }

        return true
      }),
    [accompaniments, filters]
  )

  return (
    <StoreContext.Provider value={{ accompaniments: filteredAccompaniments }}>
      {children}
    </StoreContext.Provider>
  )
}

export function useAccompaniments() {
  const { accompaniments } = useContext(StoreContext)

  return accompaniments
}

export function useInProgressAccompaniments() {
  const { accompaniments } = useContext(StoreContext)

  return accompaniments.filter(accompaniment => !accompaniment.schedulingAt)
}

export function useNonSendedAccompaniments() {
  const { accompaniments } = useContext(StoreContext)

  return accompaniments.filter(accompaniment => !accompaniment.sendedAt)
}

export function useNonRevisedAccompaniments() {
  const { accompaniments } = useContext(StoreContext)

  return accompaniments.filter(
    accompaniment => accompaniment.sendedAt && !accompaniment.reviewedAt
  )
}

export function useNonReleasedAccompaniments() {
  const { accompaniments } = useContext(StoreContext)

  return accompaniments.filter(
    accompaniment => accompaniment.reviewedAt && !accompaniment.releasedAt
  )
}

export function useNonExpectedBillingAccompaniments() {
  const { accompaniments } = useContext(StoreContext)

  return accompaniments.filter(
    accompaniment =>
      accompaniment.releasedAt && !accompaniment.expectedBillingAt
  )
}

export function useNonBilledAccompaniments() {
  const { accompaniments } = useContext(StoreContext)

  return accompaniments.filter(
    accompaniment =>
      accompaniment.expectedBillingAt &&
      (!accompaniment.billingAt || !accompaniment.transactionNumber)
  )
}

export function useNonFreeOnBoardAccompaniments() {
  const { accompaniments } = useContext(StoreContext)

  return accompaniments.filter(
    accompaniment =>
      accompaniment.transactionNumber &&
      !accompaniment.freeOnBoardAt &&
      accompaniment.purchaseOrder.freight === 'FOB'
  )
}

export function useNonSchedulingAccompaniments() {
  const { accompaniments } = useContext(StoreContext)

  return accompaniments.filter(accompaniment => {
    if (accompaniment.schedulingAt) {
      if (accompaniment.purchaseOrder.number === 16211) {
        console.log('useNonSchedulingAccompaniments', 1, { accompaniment })
      }

      return false
    }

    if (
      accompaniment.purchaseOrder.freight === 'CIF' &&
      accompaniment.transactionNumber
    ) {
      if (accompaniment.purchaseOrder.number === 16211) {
        console.log('useNonSchedulingAccompaniments', 2, { accompaniment })
      }

      return true
    }

    if (
      accompaniment.purchaseOrder.freight === 'FOB' &&
      accompaniment.freeOnBoardAt &&
      accompaniment.transactionNumber
    ) {
      if (accompaniment.purchaseOrder.number === 16211) {
        console.log('useNonSchedulingAccompaniments', 3, { accompaniment })
      }

      return true
    }

    if (accompaniment.purchaseOrder.number === 16211) {
      console.log('useNonSchedulingAccompaniments', 4, { accompaniment })
    }

    return false
  })
}

export function useNonScheduledAccompaniments() {
  const { accompaniments } = useContext(StoreContext)

  return accompaniments.filter(accompaniment => accompaniment.schedulingAt)
}

export function useScheduledAccompaniments() {
  const { accompaniments } = useContext(StoreContext)

  return accompaniments.filter(
    accompaniment => accompaniment.schedule !== undefined
  )
}

export function useReceivingAccompaniments() {
  const { accompaniments } = useContext(StoreContext)

  return accompaniments.filter(
    accompaniment =>
      accompaniment.schedulingAt && accompaniment.schedule !== undefined
  )
}

export function useDownloadedAccompaniments() {
  const { accompaniments } = useContext(StoreContext)

  return accompaniments.filter(
    accompaniment =>
      accompaniment.schedulingAt && accompaniment.schedule !== undefined
  )
}

export function useUnlockedAccompaniments() {
  const { accompaniments } = useContext(StoreContext)

  return accompaniments.filter(
    accompaniment =>
      accompaniment.schedulingAt && accompaniment.schedule !== undefined
  )
}
