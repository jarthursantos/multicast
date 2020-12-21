import React, { createContext, useMemo, useState } from 'react'

import { isSameDay } from 'date-fns'
import { cloneDeep } from 'lodash'

import { useTypedSelector } from '~/store'
import {
  IInvoice,
  ISchedule,
  ScheduleSituations
} from '~/store/modules/schedules/types'
import { normalizeDate } from '~/utils/normalize'

import { IDayWithSchedule } from './Scredules/DatePicker'
import { HomeScreenContextHandles, ReportsTabs } from './types'

export const HomeScreenContext = createContext<HomeScreenContextHandles>(
  undefined
)

const HomeScreenContextProvider: React.FC = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedSchedule, setSelectedSchedule] = useState<ISchedule>()

  const [currentReportTab, changeReportTab] = useState<ReportsTabs>(
    ReportsTabs.DISCHARGE_VALUE
  )

  const { scheduleRequests, loadingScheduleRequest } = useTypedSelector(
    state => state.scheduleRequests
  )

  const { filters, schedules, loadingSchedules } = useTypedSelector(
    state => state.schedules
  )

  const filteredScheduleRequestss = useMemo(
    () =>
      scheduleRequests.filter(schedule => {
        if (filters) {
          const { providers } = filters

          if (providers) {
            for (let i = 0; i < providers.length; i++) {
              const provider = providers[i]
              return schedule.provider.code === provider.code
            }
          }
        }

        return true
      }),
    [filters, scheduleRequests]
  )

  const scheduleRequestsOfDay = useMemo(() => {
    return cloneDeep(
      filteredScheduleRequestss.filter(({ requestedDate }) =>
        isSameDay(normalizeDate(requestedDate), normalizeDate(selectedDate))
      )
    )
  }, [filteredScheduleRequestss, selectedDate])

  const filteredSchedules = useMemo(
    () =>
      schedules.filter(schedule => {
        if (filters) {
          const { shippingName, invoiceNumber, providers, situation } = filters

          if (
            shippingName &&
            schedule.shippingName
              .toUpperCase()
              .search(shippingName.toUpperCase()) === -1
          ) {
            return false
          }

          if (situation && situation !== schedule.situation) {
            return false
          }

          if (invoiceNumber) {
            const invoicesWithNumber = schedule.invoices.filter(
              invoice => invoice.number === invoiceNumber
            )

            if (invoicesWithNumber.length === 0) {
              return false
            }
          }

          if (providers) {
            let invoicesOfProvider: IInvoice[] = []

            for (let i = 0; i < providers.length; i++) {
              const provider = providers[i]

              invoicesOfProvider = [
                ...invoicesOfProvider,
                ...schedule.invoices.filter(
                  invoice => invoice.providerCode === provider.code
                )
              ]
            }

            if (invoicesOfProvider.length === 0) {
              return false
            }
          }
        }

        return true
      }),
    [filters, schedules]
  )

  const schedulesOfDay = useMemo(() => {
    return cloneDeep(
      filteredSchedules.filter(({ scheduledAt }) =>
        isSameDay(normalizeDate(scheduledAt), normalizeDate(selectedDate))
      )
    )
  }, [filteredSchedules, selectedDate])

  const pendingProccess = useMemo(() => {
    return cloneDeep(
      schedules.filter(schedule => {
        if (
          schedule.situation === ScheduleSituations.FINISHED ||
          schedule.situation === ScheduleSituations.CANCELED ||
          schedule.situation === ScheduleSituations.RESCHEDULED ||
          schedule.situation === ScheduleSituations.OPENED ||
          schedule.situation === ScheduleSituations.SCHEDULED
        ) {
          return false
        }

        return true
      })
    )
  }, [schedules])

  const daysWithSchedules = useMemo((): IDayWithSchedule[] => {
    const result: IDayWithSchedule[] = []

    filteredSchedules.forEach(({ scheduledAt }) => {
      const date = normalizeDate(scheduledAt)

      const alreadyAdded = result.find(schedule =>
        isSameDay(schedule.date, date)
      )

      if (alreadyAdded) {
        return
      }

      result.push({ date, state: 'normal' })
    })

    filteredScheduleRequestss.forEach(({ requestedDate }) => {
      const date = normalizeDate(requestedDate)

      const alreadyAdded = result.find(
        schedule =>
          isSameDay(schedule.date, date) && schedule.state === 'request'
      )

      if (alreadyAdded) {
        return
      }

      result.push({ date, state: 'request' })
    })

    return result
  }, [filteredScheduleRequestss, filteredSchedules])

  const invoicesOfSelectedSchedule = useMemo((): IInvoice[] => {
    if (!selectedSchedule || !selectedSchedule.invoices) return []

    const { providers = [] } = filters || {}

    return selectedSchedule.invoices.filter(invoice => {
      if (providers.length === 0) return true

      for (let i = 0; i < providers.length; i++) {
        const provider = providers[i]

        if (invoice.provider.code === provider.code) return true
      }

      return false
    })
  }, [selectedSchedule, filters])

  const isLoadingData = useMemo(
    () => loadingScheduleRequest || loadingSchedules,
    [loadingScheduleRequest, loadingSchedules]
  )

  return (
    <HomeScreenContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
        daysWithSchedules,
        currentReportTab,
        changeReportTab,
        scheduleRequestsOfDay,
        isLoadingData,
        schedulesOfDay,
        selectedSchedule,
        setSelectedSchedule,
        invoicesOfSelectedSchedule,
        pendingProccess
      }}
    >
      {children}
    </HomeScreenContext.Provider>
  )
}

export { HomeScreenContextProvider }
