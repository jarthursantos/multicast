import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useCallback,
  useState,
  useEffect
} from 'react'

interface ContextHandles {
  isSituationActive(name: string): boolean
  setCurrentActiveSituation: Dispatch<SetStateAction<string>>
}

interface Props {
  initialSituation?: string
  onChange?(name: string): void
}

const SituationGroupContext = createContext<ContextHandles>(null)

export const SituationGroupContextProvider: React.FC<Props> = ({
  initialSituation,
  onChange,
  children
}) => {
  const [currentActiveSituation, setCurrentActiveSituation] = useState<string>(
    initialSituation
  )

  const isSituationActive = useCallback(
    (name: string): boolean => currentActiveSituation === name,
    [currentActiveSituation]
  )

  useEffect(() => onChange && onChange(currentActiveSituation), [
    onChange,
    currentActiveSituation
  ])

  return (
    <SituationGroupContext.Provider
      value={{ isSituationActive, setCurrentActiveSituation }}
    >
      {children}
    </SituationGroupContext.Provider>
  )
}

export const useActiveSituation = (name: string): [boolean, () => void] => {
  const { isSituationActive, setCurrentActiveSituation } = useContext(
    SituationGroupContext
  )

  return [isSituationActive(name), () => setCurrentActiveSituation(name)]
}
