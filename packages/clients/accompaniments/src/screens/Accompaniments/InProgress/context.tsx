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
  AccompanimentsInProgressComponentHandles,
  InProgressScreenContextHandles,
  InProgressScreenProps,
  InProgressTabs
} from './types'

export const InProgressScreenContext = createContext<
  InProgressScreenContextHandles
>(null)

const InProgressScreenContextProviderComponent: React.ForwardRefRenderFunction<
  AccompanimentsInProgressComponentHandles,
  InProgressScreenProps
> = ({ initialSituation, onChange, children }, ref) => {
  const [currentActiveSituation, setCurrentActiveSituation] = useState<
    InProgressTabs
  >(initialSituation)

  const isSituationActive = useCallback(
    (situation: InProgressTabs): boolean =>
      currentActiveSituation === situation,
    [currentActiveSituation]
  )

  useEffect(() => onChange && onChange(currentActiveSituation), [
    onChange,
    currentActiveSituation
  ])

  useImperativeHandle<{}, AccompanimentsInProgressComponentHandles>(
    ref,
    () => ({ changeCurrentTab: setCurrentActiveSituation }),
    [setCurrentActiveSituation]
  )

  return (
    <InProgressScreenContext.Provider
      value={{
        isSituationActive,
        setCurrentActiveSituation,
        currentSituation: currentActiveSituation
      }}
    >
      {children}
    </InProgressScreenContext.Provider>
  )
}

export const InProgressScreenContextProvider = forwardRef(
  InProgressScreenContextProviderComponent
)

export const useActiveSituation = (
  situation: InProgressTabs
): [boolean, () => void] => {
  const { isSituationActive, setCurrentActiveSituation } = useContext(
    InProgressScreenContext
  )

  return [
    isSituationActive(situation),
    () => setCurrentActiveSituation(situation)
  ]
}
