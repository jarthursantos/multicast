import React, { createContext, useContext, useMemo } from 'react'

import { isAfter, isBefore, parseISO } from 'date-fns'

import { useTypedSelector } from '~/store'
import {
  Accompaniment,
  CriticalLevel
} from '~/store/modules/accompaniments/types'

const StoreContext = createContext<{ accompaniments: Accompaniment[] }>(null)

export function delayComparer(
  accompaniment: Accompaniment,
  other: Accompaniment
) {
  if (accompaniment.criticalLevel === other.criticalLevel) {
    return other.delay - accompaniment.delay
  }

  if (accompaniment.criticalLevel === CriticalLevel.DANGER) {
    return -1
  }

  if (other.criticalLevel === CriticalLevel.DANGER) {
    return 1
  }

  if (accompaniment.criticalLevel === CriticalLevel.ALERT) {
    return -1
  }

  if (other.criticalLevel === CriticalLevel.ALERT) {
    return 1
  }
}

export const StoreContextProvider: React.FC = ({ children }) => {
  const { accompaniments, filters } = useTypedSelector(
    state => state.accompaniments
  )

  const filteredAccompaniments = useMemo(() => {
    return accompaniments
      .filter(accompaniment => {
        if (
          filters.periodFrom &&
          isBefore(
            typeof accompaniment.purchaseOrder.emittedAt === 'string'
              ? parseISO(accompaniment.purchaseOrder.emittedAt)
              : accompaniment.purchaseOrder.emittedAt,
            filters.periodFrom
          )
        ) {
          return false
        }

        if (
          filters.periodTo &&
          isAfter(
            typeof accompaniment.purchaseOrder.emittedAt === 'string'
              ? parseISO(accompaniment.purchaseOrder.emittedAt)
              : accompaniment.purchaseOrder.emittedAt,
            filters.periodTo
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

        if (filters.providers && filters.providers.length !== 0) {
          for (let i = 0; i < filters.providers.length; i++) {
            const provider = filters.providers[i]

            if (provider.code === accompaniment.purchaseOrder.provider?.code) {
              return true
            }
          }

          return false
        }

        if (filters.buyers && filters.buyers.length !== 0) {
          for (let i = 0; i < filters.buyers.length; i++) {
            const provider = filters.buyers[i]

            if (provider.code === accompaniment.purchaseOrder.buyer?.code) {
              return true
            }
          }

          return false
        }

        return true
      })
      .sort(delayComparer)
  }, [accompaniments, filters])

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
  const nonSended = useNonSendedAccompaniments()
  const nonRevised = useNonRevisedAccompaniments()
  const nonReleased = useNonReleasedAccompaniments()
  const nonExpectedBilling = useNonExpectedBillingAccompaniments()
  const nonBilled = useNonBilledAccompaniments()
  const nonFreeOnBoard = useNonFreeOnBoardAccompaniments()
  const nonScheduling = useNonSchedulingAccompaniments()

  return [
    ...nonSended,
    ...nonRevised,
    ...nonReleased,
    ...nonExpectedBilling,
    ...nonBilled,
    ...nonFreeOnBoard,
    ...nonScheduling
  ]
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
      return false
    }

    if (
      accompaniment.purchaseOrder.freight === 'CIF' &&
      accompaniment.transactionNumber
    ) {
      return true
    }

    if (
      accompaniment.purchaseOrder.freight === 'FOB' &&
      accompaniment.freeOnBoardAt &&
      accompaniment.transactionNumber
    ) {
      return true
    }

    return false
  })
}

export function useNonScheduledAccompaniments() {
  const { accompaniments } = useContext(StoreContext)

  return accompaniments.filter(
    accompaniment =>
      accompaniment.schedulingAt && accompaniment.schedule === undefined
  )
}

export function useScheduledAccompaniments() {
  const { accompaniments } = useContext(StoreContext)

  return accompaniments.filter(
    accompaniment =>
      accompaniment.schedule !== undefined && !accompaniment.schedule.receivedAt
  )
}

export function useReceivingAccompaniments() {
  const { accompaniments } = useContext(StoreContext)

  return accompaniments.filter(
    accompaniment =>
      accompaniment.schedule !== undefined &&
      accompaniment.schedule.receivedAt &&
      accompaniment.schedule.downloadedAt === undefined
  )
}

export function useDownloadedAccompaniments() {
  const { accompaniments } = useContext(StoreContext)

  return accompaniments.filter(
    accompaniment =>
      accompaniment.schedule !== undefined &&
      accompaniment.schedule.downloadedAt &&
      accompaniment.schedule.unlockedAt === undefined
  )
}

export function useUnlockedAccompaniments() {
  const { accompaniments } = useContext(StoreContext)

  return accompaniments.filter(
    accompaniment =>
      accompaniment.schedule !== undefined && accompaniment.schedule.unlockedAt
  )
}

// if (filters) {
//   const {
//     periodFrom,
//     periodTo,
//     numberFrom,
//     numberTo,
//     providers,
//     buyers
//   } = filters

//   result = accompaniments.filter(accompaniment => {
//     if (
//       periodFrom &&
//       isBefore(
//         typeof accompaniment.purchaseOrder.emittedAt === 'string'
//           ? parseISO(accompaniment.purchaseOrder.emittedAt)
//           : accompaniment.purchaseOrder.emittedAt,
//         periodFrom
//       )
//     ) {
//       return false
//     }

//     if (
//       periodTo &&
//       isAfter(
//         typeof accompaniment.purchaseOrder.emittedAt === 'string'
//           ? parseISO(accompaniment.purchaseOrder.emittedAt)
//           : accompaniment.purchaseOrder.emittedAt,
//         periodTo
//       )
//     ) {
//       return false
//     }

//     if (numberFrom && accompaniment.purchaseOrder.number < numberFrom) {
//       return false
//     }

//     if (numberTo && accompaniment.purchaseOrder.number > numberTo) {
//       return false
//     }

//     return true
//   })
// }
