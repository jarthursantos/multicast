import React, { createContext, useContext, useState } from 'react'

import { cloneDeep } from 'lodash'

import { IProvider } from '@shared/web-components'

import { useTypedSelector } from '~/store'
import { StockProduct } from '~/store/modules/stockNotifications/types'

import { StockNotificationsContextHandles } from './types'

export const StockNotificationsContext = createContext<
  StockNotificationsContextHandles
>(null)

export const StockNotificationsContextProvider: React.FC = ({ children }) => {
  const [arrivedProvider, setArrivedProvider] = useState<IProvider>()
  const [releasedProvider, setReleasedProvider] = useState<IProvider>()
  const [terminatedProvider, setTerminatedProvider] = useState<IProvider>()

  const { arrived, released, terminated } = useTypedSelector(
    state => state.stockNotifications
  )

  return (
    <StockNotificationsContext.Provider
      value={{
        arrived: cloneDeep(arrived),
        arrivedProvider,
        setArrivedProvider,

        released: cloneDeep(released),
        releasedProvider,
        setReleasedProvider,

        terminated: cloneDeep(terminated),
        terminatedProvider,
        setTerminatedProvider
      }}
    >
      {children}
    </StockNotificationsContext.Provider>
  )
}

function extractProviders(products: StockProduct[]) {
  return products
    .map(({ provider }) => provider)
    .reduce<IProvider[]>((providers, provider) => {
      const alreadyAdded = providers.find(({ code }) => provider.code === code)

      if (!alreadyAdded) {
        return [...providers, provider]
      }

      return providers
    }, [])
}

export function useArrivedProviders() {
  const { arrived } = useContext(StockNotificationsContext)

  return extractProviders(arrived)
}

export function useSetArrivedProvider() {
  const { setArrivedProvider } = useContext(StockNotificationsContext)

  return setArrivedProvider
}

export function useArrivedProducts() {
  const { arrived, arrivedProvider } = useContext(StockNotificationsContext)

  if (!arrivedProvider) {
    return []
  }

  return arrived.filter(
    ({ provider }) => provider.code === arrivedProvider.code
  )
}

export function useReleasedProviders() {
  const { released } = useContext(StockNotificationsContext)

  return extractProviders(released)
}

export function useSetReleasedProvider() {
  const { setReleasedProvider } = useContext(StockNotificationsContext)

  return setReleasedProvider
}

export function useReleasedProducts() {
  const { released, releasedProvider } = useContext(StockNotificationsContext)

  if (!releasedProvider) {
    return []
  }

  return released.filter(
    ({ provider }) => provider.code === releasedProvider.code
  )
}

export function useTerminatedProviders() {
  const { terminated } = useContext(StockNotificationsContext)

  return extractProviders(terminated)
}

export function useSetTerminatedProvider() {
  const { setTerminatedProvider } = useContext(StockNotificationsContext)

  return setTerminatedProvider
}

export function useTerminatedProducts() {
  const { terminated, terminatedProvider } = useContext(
    StockNotificationsContext
  )

  if (!terminatedProvider) {
    return []
  }

  return terminated.filter(
    ({ provider }) => provider.code === terminatedProvider.code
  )
}
