import { IScheduleRequest } from '~/store/modules/schedule-requests/types'
import { IInvoice, ISchedule } from '~/store/modules/schedules/types'

import { IDayWithSchedule } from './Scredules/DatePicker'

export interface HomeScreenContextHandles {
  selectedDate: Date
  setSelectedDate(date: Date): void
  daysWithSchedules: IDayWithSchedule[]

  isLoadingData: boolean

  currentReportTab: ReportsTabs
  changeReportTab(tab: ReportsTabs): void

  schedulesOfDay: ISchedule[]
  scheduleRequestsOfDay: IScheduleRequest[]
  invoicesOfSelectedSchedule: IInvoice[]

  selectedSchedule: ISchedule | undefined
  setSelectedSchedule(schedule: ISchedule): void
}

export enum HomeScreenTabs {
  SCHEDULES = 'SCHEDULES',
  REPORTS = 'REPORTS'
}

export enum ReportsTabs {
  PENDING_PROCCESS = 'PENDING_PROCCESS',
  DISCHARGE_VALUE = 'DISCHARGE_VALUE'
}
