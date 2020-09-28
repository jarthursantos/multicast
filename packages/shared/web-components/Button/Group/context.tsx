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
  isButtonActive(name: string): boolean
  setCurrentActiveButton: Dispatch<SetStateAction<string>>
}

interface Props {
  initialButton: string
  onChange?(name: string): void
}

const ButtonGroupContext = createContext<ContextHandles>(null)

export const ButtonGroupContextProvider: React.FC<Props> = ({
  initialButton,
  onChange,
  children
}) => {
  const [currentActiveButton, setCurrentActiveButton] = useState<string>(
    initialButton
  )

  const isButtonActive = useCallback(
    (name: string): boolean => currentActiveButton === name,
    [currentActiveButton]
  )

  useEffect(() => onChange && onChange(currentActiveButton), [
    onChange,
    currentActiveButton
  ])

  return (
    <ButtonGroupContext.Provider
      value={{ isButtonActive, setCurrentActiveButton }}
    >
      {children}
    </ButtonGroupContext.Provider>
  )
}

export const useActiveButton = (name: string): [boolean, () => void] => {
  const { isButtonActive, setCurrentActiveButton } = useContext(
    ButtonGroupContext
  )

  return [isButtonActive(name), () => setCurrentActiveButton(name)]
}
