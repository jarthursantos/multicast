import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback
} from 'react'

import { useAxios } from '@shared/axios'

import {
  RepresentativesContextHandles,
  Representative,
  BuyerRepresentativeGroup,
  RepresentedRepresentativeGroup
} from './types'

export const RepresentativesContext = createContext<
  RepresentativesContextHandles
>(null)

export const RepresentativesContextProvider: React.FC = ({ children }) => {
  const [api, haveToken] = useAxios()

  const [representatives, setRepresentatives] = useState<Representative[]>([])

  const loadRepresentatives = useCallback(async () => {
    if (!haveToken) {
      return
    }

    const { data } = await api.get<Representative[]>('/representatives')

    setRepresentatives(data)
  }, [api, haveToken])

  useEffect(() => {
    loadRepresentatives()
  }, [loadRepresentatives])

  return (
    <RepresentativesContext.Provider value={{ representatives }}>
      {children}
    </RepresentativesContext.Provider>
  )
}

export function useAllRepresentatives(): Representative[] {
  const { representatives } = useContext(RepresentativesContext)

  return representatives
}

export function useRepresentedPerRepresentative(): RepresentedRepresentativeGroup[] {
  const { representatives } = useContext(RepresentativesContext)

  return representatives.reduce<RepresentedRepresentativeGroup[]>(
    (curr, represented) => {
      let representative = curr.find(
        representative => representative.name === represented.name
      )

      if (!representative) {
        representative = {
          ...represented,
          representatives: []
        }

        curr.push(representative)
      }

      representative.representatives.push(represented)

      return curr
    },
    []
  )
}

export function useRepresentativesPerBuyer(): BuyerRepresentativeGroup[] {
  const { representatives } = useContext(RepresentativesContext)

  return representatives.reduce<BuyerRepresentativeGroup[]>(
    (curr, representative) => {
      let buyer = curr.find(
        buyer => buyer.code === representative.provider.buyer.code
      )

      if (!buyer) {
        buyer = {
          ...representative.provider.buyer,
          representatives: []
        }

        curr.push(buyer)
      }

      buyer.representatives.push(representative)

      return curr
    },
    []
  )
}
