import React, {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef
} from 'react'

import {
  AccompanimentsInReceivementComponentHandles,
  InReceivementScreenContextHandles,
  AccompanimentsInReceivementScreenProps,
  InReceivementTabs
} from './types'

export const ReceivementScreenContext = createContext<
  InReceivementScreenContextHandles
>(null)

const ReceivementScreenContextProviderComponent: React.ForwardRefRenderFunction<
  AccompanimentsInReceivementComponentHandles,
  AccompanimentsInReceivementScreenProps
> = ({ initialSituation, onChange, children }, ref) => {
  const [currentActiveSituation, setCurrentActiveSituation] = useState<
    InReceivementTabs
  >(initialSituation)

  const isSituationActive = useCallback(
    (situation: InReceivementTabs): boolean =>
      currentActiveSituation === situation,
    [currentActiveSituation]
  )

  useEffect(() => onChange && onChange(currentActiveSituation), [
    onChange,
    currentActiveSituation
  ])

  useImperativeHandle<{}, AccompanimentsInReceivementComponentHandles>(
    ref,
    () => ({ changeCurrentTab: setCurrentActiveSituation }),
    [setCurrentActiveSituation]
  )

  return (
    <ReceivementScreenContext.Provider
      value={{
        isSituationActive,
        setCurrentActiveSituation,
        currentSituation: currentActiveSituation
      }}
    >
      {children}
    </ReceivementScreenContext.Provider>
  )
}

export const ReceivementScreenContextProvider = forwardRef(
  ReceivementScreenContextProviderComponent
)

export const useActiveSituation = (
  situation: InReceivementTabs
): [boolean, () => void] => {
  const { isSituationActive, setCurrentActiveSituation } = useContext(
    ReceivementScreenContext
  )

  return [
    isSituationActive(situation),
    () => setCurrentActiveSituation(situation)
  ]
}
