import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'

import {
  ReportSelectorContextHandles,
  ReportSelectorContextProps
} from './types'

const ReportSelectorContext = createContext<ReportSelectorContextHandles>(null)

export const ReportSelectorContextProvider: React.FC<ReportSelectorContextProps> = ({
  children,
  initialReport,
  onReportChange
}) => {
  const [currentActiveTab, setCurrentActiveReport] = useState<string>(
    initialReport
  )

  const isReportActive = useCallback(
    (name: string): boolean => currentActiveTab === name,
    [currentActiveTab]
  )

  useEffect(() => onReportChange(currentActiveTab), [
    currentActiveTab,
    onReportChange
  ])

  return (
    <ReportSelectorContext.Provider
      value={{ isReportActive, setCurrentActiveReport }}
    >
      {children}
    </ReportSelectorContext.Provider>
  )
}

export const useActiveReport = (title: string): [boolean, () => void] => {
  const { isReportActive, setCurrentActiveReport } = useContext(
    ReportSelectorContext
  )

  return [isReportActive(title), () => setCurrentActiveReport(title)]
}
