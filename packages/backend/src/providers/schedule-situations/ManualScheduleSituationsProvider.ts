import { isBefore, subDays } from 'date-fns'

import { IInvoice } from '~/domain/IInvoice'
import { InvoiceSituations } from '~/domain/InvoiceSituations'
import { ScheduleSituations } from '~/domain/ScheduleSituations'

import {
  IScheduleSituationsProvider,
  IScheduleSituationConditions
} from './IScheduleSituationsProvider'

export function createManualScheduleSituationsProvider(): IScheduleSituationsProvider {
  return {
    find(
      schedule: IScheduleSituationConditions,
      invoices: IInvoice[] = []
    ): ScheduleSituations {
      const nonCanceledInvoices = invoices.filter(
        invoice => !invoice.canceledAt
      )

      if (schedule.rescheduledAt) {
        return ScheduleSituations.RESCHEDULED
      }

      if (schedule.canceledAt) {
        return ScheduleSituations.CANCELED
      }

      if (schedule.receivedAt) {
        const finishedInvoices = nonCanceledInvoices.filter(
          invoice => invoice.situation === InvoiceSituations.OS_FINISHED
        )

        if (finishedInvoices.length === nonCanceledInvoices.length) {
          return ScheduleSituations.FINISHED
        }

        const receivedInvoices = nonCanceledInvoices.filter(
          invoice => invoice.situation === InvoiceSituations.BONUS_FINISHED
        )

        if (receivedInvoices.length === nonCanceledInvoices.length) {
          return ScheduleSituations.RECEIVED
        }

        const receivingInvoices = nonCanceledInvoices.filter(
          invoice =>
            invoice.situation !== InvoiceSituations.INVOICE_NON_LAUNCHED &&
            invoice.situation !== InvoiceSituations.INVOICE_PRE_LAUNCHED &&
            invoice.situation !== InvoiceSituations.INVOICE_LAUNCHED
        )

        if (receivingInvoices.length >= 0) {
          return ScheduleSituations.RECEIVING
        }

        return ScheduleSituations.WAITING
      }

      if (schedule.closedAt) {
        return ScheduleSituations.SCHEDULED
      }

      if (isBefore(schedule.scheduledAt, subDays(new Date(), 1))) {
        return ScheduleSituations.NON_RECEIVED
      }

      return ScheduleSituations.OPENED
    }
  }
}
