import { PrismaClient } from '@prisma/client'
import createHttpError from 'http-errors'
import { omit } from 'lodash'

import { createDischargeTable } from '~/domain/IDischargeTable'
import { IInvoice } from '~/domain/IInvoice'
import { IRescheduleResult } from '~/domain/IRescheduleResult'
import { createSchedule, ISchedule } from '~/domain/ISchedule'
import { IScheduleSituationsProvider } from '~/providers/schedule-situations/IScheduleSituationsProvider'

import { IRescheduleInvoicesModel } from '../reschedule-invoices/IRescheduleInvoicesModel'
import { IScheduleInvoicesModel } from '../schedule-invoices/IScheduleInvoicesModel'
import { IRescheduleSchedulesModel } from './IRescheduleSchedulesModel'

export function createPrismaRescheduleSchedulesModel(
  scheduleInvoicesModel: IScheduleInvoicesModel,
  scheduleSituationsProvider: IScheduleSituationsProvider,
  rescheduleInvoicesModel: IRescheduleInvoicesModel
): IRescheduleSchedulesModel {
  const prisma = new PrismaClient()

  function extractTotals(invoices: IInvoice[]) {
    const totalWeight = invoices.reduce(
      (currentWeight, { weight }) => currentWeight + (weight || 0),
      0
    )

    const totalVolume = invoices.reduce(
      (currentVolume, { volume }) => currentVolume + (volume || 0),
      0
    )

    const totalValue = invoices.reduce(
      (currentValue, { value }) => currentValue + (value || 0),
      0
    )

    return {
      totalWeight,
      totalVolume,
      totalValue
    }
  }

  return {
    async reschedule(
      schedule: ISchedule,
      newDate: Date
    ): Promise<IRescheduleResult> {
      const rescheduleData = createSchedule({
        ...omit(schedule, 'id'),
        scheduledAt: newDate
      })

      const reschedule = await prisma.schedules.create({
        data: {
          ...omit(
            rescheduleData,
            'invoices',
            'situation',
            'rescheduledTo',
            'rescheduledFrom',
            'dischargeTable',
            'scheduleRequest',
            'totalWeight',
            'totalVolume',
            'totalValue'
          ),
          rescheduledFrom: { connect: { id: schedule.id } },
          dischargeTable: { connect: { id: schedule.dischargeTable.id } }
        }
      })

      if (!reschedule.scheduledAt) {
        throw new createHttpError.BadRequest('Agendamento sem data')
      }

      const updatedSchedule = await prisma.schedules.update({
        where: { id: schedule.id },
        data: {
          rescheduledAt: new Date(),
          rescheduledTo: { connect: { id: reschedule.id } }
        }
      })

      if (!updatedSchedule.scheduledAt) {
        throw new createHttpError.BadRequest('Agendamento sem data')
      }

      const invoices = await scheduleInvoicesModel.findInvoicesOfSchedule(
        schedule.id
      )

      const rescheduledInvoices = await rescheduleInvoicesModel.reschedule(
        invoices,
        reschedule.id
      )

      const rescheduleSituation = scheduleSituationsProvider.find(
        {
          scheduledAt: reschedule.scheduledAt,
          canceledAt: reschedule.canceledAt || undefined,
          closedAt: reschedule.closedAt || undefined,
          receivedAt: reschedule.receivedAt || undefined,
          rescheduledAt: reschedule.rescheduledAt || undefined
        },
        invoices
      )

      const updatedSituation = scheduleSituationsProvider.find(
        {
          scheduledAt: updatedSchedule.scheduledAt,
          canceledAt: updatedSchedule.canceledAt || undefined,
          closedAt: updatedSchedule.closedAt || undefined,
          receivedAt: updatedSchedule.receivedAt || undefined,
          rescheduledAt: updatedSchedule.rescheduledAt || undefined
        },
        rescheduledInvoices
      )

      const { totalVolume, totalWeight, totalValue } = extractTotals(invoices)

      const dischargeTable = createDischargeTable(
        schedule.dischargeTable,
        schedule.dischargeTable.id
      )

      return {
        schedule: createSchedule(
          {
            scheduledAt: updatedSchedule.scheduledAt,
            priority: updatedSchedule.priority || schedule.priority,
            shippingName: String(
              updatedSchedule.shippingName || schedule.shippingName
            ),
            assistant:
              updatedSchedule.assistant || schedule.assistant || undefined,
            canceledAt:
              updatedSchedule.canceledAt || schedule.canceledAt || undefined,
            chargeType:
              updatedSchedule.chargeType || schedule.chargeType || undefined,
            closedAt:
              updatedSchedule.closedAt || schedule.closedAt || undefined,
            createdAt: updatedSchedule.createdAt || schedule.createdAt,
            dischargeValue:
              updatedSchedule.dischargeValue ||
              schedule.dischargeValue ||
              undefined,
            driver: updatedSchedule.driver || schedule.driver || undefined,
            freightType:
              updatedSchedule.freightType || schedule.freightType || undefined,
            lecturer:
              updatedSchedule.lecturer || schedule.lecturer || undefined,
            motive: updatedSchedule.motive || schedule.motive || undefined,
            palletized:
              updatedSchedule.palletized || schedule.palletized || undefined,
            paymentMethod:
              updatedSchedule.paymentMethod ||
              schedule.paymentMethod ||
              undefined,
            pipeSize:
              updatedSchedule.pipeSize || schedule.pipeSize || undefined,
            receiptPerInvoice:
              updatedSchedule.receiptPerInvoice ||
              schedule.receiptPerInvoice ||
              undefined,
            receiptValue:
              updatedSchedule.receiptValue ||
              schedule.receiptValue ||
              undefined,
            receivedAt:
              updatedSchedule.receivedAt || schedule.receivedAt || undefined,
            rescheduledAt:
              updatedSchedule.rescheduledAt ||
              schedule.rescheduledAt ||
              undefined,
            updatedAt: updatedSchedule.updatedAt || schedule.updatedAt,
            vehicleSize:
              updatedSchedule.vehicleSize || schedule.vehicleSize || undefined,
            vehicleType:
              updatedSchedule.vehicleType || schedule.vehicleType || undefined,
            dischargeTable,
            totalVolume,
            totalWeight,
            totalValue,
            invoices,
            situation: updatedSituation
          },
          schedule.id
        ),
        reschedule: createSchedule(
          {
            scheduledAt: reschedule.scheduledAt,
            priority: reschedule.priority || schedule.priority,
            shippingName: String(
              reschedule.shippingName || schedule.shippingName
            ),
            assistant: reschedule.assistant || schedule.assistant || undefined,
            canceledAt:
              reschedule.canceledAt || schedule.canceledAt || undefined,
            chargeType:
              reschedule.chargeType || schedule.chargeType || undefined,
            closedAt: reschedule.closedAt || schedule.closedAt || undefined,
            createdAt: reschedule.createdAt || schedule.createdAt,
            dischargeValue:
              reschedule.dischargeValue || schedule.dischargeValue || undefined,
            driver: reschedule.driver || schedule.driver || undefined,
            freightType:
              reschedule.freightType || schedule.freightType || undefined,
            lecturer: reschedule.lecturer || schedule.lecturer || undefined,
            motive: reschedule.motive || schedule.motive || undefined,
            palletized:
              reschedule.palletized || schedule.palletized || undefined,
            paymentMethod:
              reschedule.paymentMethod || schedule.paymentMethod || undefined,
            pipeSize: reschedule.pipeSize || schedule.pipeSize || undefined,
            receiptPerInvoice:
              reschedule.receiptPerInvoice ||
              schedule.receiptPerInvoice ||
              undefined,
            receiptValue:
              reschedule.receiptValue || schedule.receiptValue || undefined,
            receivedAt:
              reschedule.receivedAt || schedule.receivedAt || undefined,
            rescheduledAt:
              reschedule.rescheduledAt || schedule.rescheduledAt || undefined,
            updatedAt: reschedule.updatedAt || schedule.updatedAt,
            vehicleSize:
              reschedule.vehicleSize || schedule.vehicleSize || undefined,
            vehicleType:
              reschedule.vehicleType || schedule.vehicleType || undefined,
            dischargeTable,
            totalVolume,
            totalWeight,
            totalValue,
            invoices: rescheduledInvoices,
            situation: rescheduleSituation
          },
          reschedule.id
        )
      }
    }
  }
}
