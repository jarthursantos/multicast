import { isBefore, subDays } from 'date-fns'
import { Invoice } from 'entities/Invoice'
import { InvoiceSituations } from 'entities/InvoiceSituations'
import { ScheduleSituations } from 'entities/ScheduleSituations'
import {
  IScheduleSituationsProvider,
  ScheduleSituationConditions
} from 'providers/IScheduleSituationsProvider'

export class ScheduleSituationsProvider implements IScheduleSituationsProvider {
  find(
    schedule: ScheduleSituationConditions,
    invoices: Invoice[] = []
  ): ScheduleSituations {
    if (schedule.rescheduledAt) {
      return ScheduleSituations.RESCHEDULED
    }

    if (schedule.canceledAt) {
      return ScheduleSituations.CANCELED
    }

    if (schedule.receivedAt) {
      const finishedInvoices = invoices.filter(
        invoice =>
          invoice.situation === InvoiceSituations.OS_FINISHED &&
          !invoice.canceledAt
      )

      if (finishedInvoices.length === invoices.length) {
        return ScheduleSituations.FINISHED
      }

      const receivedInvoices = invoices.filter(
        invoice =>
          invoice.situation === InvoiceSituations.BONUS_FINISHED &&
          !invoice.canceledAt
      )

      if (receivedInvoices.length === invoices.length) {
        return ScheduleSituations.RECEIVED
      }

      const receivingInvoices = invoices.filter(
        invoice =>
          invoice.situation !== InvoiceSituations.INVOICE_NON_LAUNCHED &&
          invoice.situation !== InvoiceSituations.INVOICE_PRE_LAUNCHED &&
          invoice.situation !== InvoiceSituations.INVOICE_LAUNCHED &&
          !invoice.canceledAt
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
