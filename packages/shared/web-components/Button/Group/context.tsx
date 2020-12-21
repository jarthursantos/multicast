import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useCallback,
  useEffect
} from 'react'

interface ContextHandles {
  isButtonActive(name: string): boolean
  setCurrentActiveButton: Dispatch<SetStateAction<string>>
}

interface Props {
  currentButton: string
  onChange?(name: string): void
}

const ButtonGroupContext = createContext<ContextHandles>(null)

export const ButtonGroupContextProvider: React.FC<Props> = ({
  currentButton,
  onChange,
  children
}) => {
  const isButtonActive = useCallback(
    (name: string): boolean => currentButton === name,
    [currentButton]
  )

  useEffect(() => onChange && onChange(currentButton), [
    onChange,
    currentButton
  ])

  return (
    <ButtonGroupContext.Provider
      value={{ isButtonActive, setCurrentActiveButton: onChange }}
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
