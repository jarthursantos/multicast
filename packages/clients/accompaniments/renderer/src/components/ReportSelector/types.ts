import { Dispatch, SetStateAction } from 'react'

export interface ReportSelectorProps {
  initialReport: string
  onReportChange(report: string): void
  reports: ReportData[]
}

export interface ReportData {
  name: string
  title: string
}

export type ReportSelectorContextProps = Omit<ReportSelectorProps, 'reports'>

export interface ReportSelectorContextHandles {
  isReportActive(name: string): boolean
  setCurrentActiveReport: Dispatch<SetStateAction<string>>
}
