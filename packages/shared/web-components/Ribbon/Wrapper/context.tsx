import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useCallback,
  useState
} from 'react'

interface ContextHandles {
  isTabActive(name: string): boolean
  setCurrentActiveTab: Dispatch<SetStateAction<string>>
}

const RibbonContext = createContext<ContextHandles>(null)

export const RibbonContextProvider: React.FC = ({ children }) => {
  const [currentActiveTab, setCurrentActiveTab] = useState<string>()

  const isTabActive = useCallback(
    (name: string): boolean => currentActiveTab === name,
    [currentActiveTab]
  )

  return (
    <RibbonContext.Provider value={{ isTabActive, setCurrentActiveTab }}>
      {children}
    </RibbonContext.Provider>
  )
}

export const useActiveTab = (name: string): [boolean, () => void] => {
  const { isTabActive, setCurrentActiveTab } = useContext(RibbonContext)

  return [isTabActive(name), () => setCurrentActiveTab(name)]
}
