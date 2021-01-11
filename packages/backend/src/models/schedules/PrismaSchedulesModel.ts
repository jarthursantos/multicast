import { PrismaClient } from '@prisma/client'
import { endOfDay, endOfMonth, startOfDay, startOfMonth } from 'date-fns'
import createHttpError from 'http-errors'
import { omit } from 'lodash'

import { createDischargeTable } from '~/domain/IDischargeTable'
import { IInvoice } from '~/domain/IInvoice'
import { createSchedule, ISchedule } from '~/domain/ISchedule'
import { IScheduleSituationsProvider } from '~/providers/schedule-situations/IScheduleSituationsProvider'

import { IScheduleInvoicesModel } from '../schedule-invoices/IScheduleInvoicesModel'
import { ISchedulesModel, IFindManyOptions } from './ISchedulesModel'

export function createPrismaSchedulesModel(
  scheduleInvoicesModel: IScheduleInvoicesModel,
  scheduleSituationsProvider: IScheduleSituationsProvider
): ISchedulesModel {
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
    async save(schedule: ISchedule): Promise<void> {
      await prisma.schedules.create({
        data: {
          ...omit(
            schedule,
            'invoices',
            'situation',
            'rescheduledTo',
            'rescheduledFrom',
            'dischargeTable',
            'scheduleRequest',
            'totalWeight',
            'totalVolume',
            'totalValue',
            'dischargeTable'
          ),
          dischargeTable: { connect: { id: schedule.dischargeTable.id } }
        }
      })
    },

    async findMany(options?: IFindManyOptions): Promise<ISchedule[]> {
      const schedules = await prisma.schedules.findMany({
        where: options
          ? {
              scheduledAt: {
                gte: startOfMonth(new Date(options.year, options.month - 1)),
                lte: endOfMonth(new Date(options.year, options.month - 1))
              }
            }
          : {},
        include: { dischargeTable: true }
      })

      const result: ISchedule[] = []

      for (let i = 0; i < schedules.length; i++) {
        const schedule = schedules[i]

        if (!schedule.scheduledAt) {
          throw new createHttpError.BadRequest(
            'Agendamento não possui uma data'
          )
        }

        const invoices = await scheduleInvoicesModel.findInvoicesOfSchedule(
          schedule.id
        )

        const situation = scheduleSituationsProvider.find(
          {
            scheduledAt: schedule.scheduledAt,
            canceledAt: schedule.canceledAt || undefined,
            closedAt: schedule.closedAt || undefined,
            receivedAt: schedule.receivedAt || undefined,
            rescheduledAt: schedule.rescheduledAt || undefined
          },
          invoices
        )

        const { totalVolume, totalWeight, totalValue } = extractTotals(invoices)

        const dischargeTable = createDischargeTable(
          schedule.dischargeTable,
          schedule.dischargeTable.id
        )

        result.push(
          createSchedule(
            {
              priority: schedule.priority,
              scheduledAt: schedule.scheduledAt,
              shippingName: String(schedule.shippingName),
              assistant: schedule.assistant || undefined,
              canceledAt: schedule.canceledAt || undefined,
              chargeType: schedule.chargeType || undefined,
              closedAt: schedule.closedAt || undefined,
              createdAt: schedule.createdAt,
              dischargeValue: schedule.dischargeValue || undefined,
              driver: schedule.driver || undefined,
              freightType: schedule.freightType || undefined,
              lecturer: schedule.lecturer || undefined,
              motive: schedule.motive || undefined,
              palletized: schedule.palletized || undefined,
              paymentMethod: schedule.paymentMethod || undefined,
              pipeSize: schedule.pipeSize || undefined,
              receiptPerInvoice: schedule.receiptPerInvoice || undefined,
              receiptValue: schedule.receiptValue || undefined,
              receivedAt: schedule.receivedAt || undefined,
              rescheduledAt: schedule.rescheduledAt || undefined,
              updatedAt: schedule.updatedAt,
              vehicleSize: schedule.vehicleSize || undefined,
              vehicleType: schedule.vehicleType || undefined,
              dischargeTable,
              invoices,
              situation,
              totalWeight,
              totalVolume,
              totalValue
            },
            schedule.id
          )
        )
      }

      return result
    },

    async findReceivedsFromPeriod(
      periodStart: Date,
      periodEnd: Date
    ): Promise<ISchedule[]> {
      const schedules = await prisma.schedules.findMany({
        where: {
          NOT: { receivedAt: null },
          scheduledAt: {
            gte: startOfDay(periodStart),
            lte: endOfDay(periodEnd)
          },
          rescheduledAt: null,
          canceledAt: null
        },
        include: { dischargeTable: true }
      })

      const result: ISchedule[] = []

      for (let i = 0; i < schedules.length; i++) {
        const schedule = schedules[i]

        if (!schedule.scheduledAt) {
          throw new createHttpError.BadRequest(
            'Agendamento não possui uma data'
          )
        }

        const invoices = await scheduleInvoicesModel.findInvoicesOfSchedule(
          schedule.id
        )

        const situation = scheduleSituationsProvider.find(
          {
            scheduledAt: schedule.scheduledAt,
            canceledAt: schedule.canceledAt || undefined,
            closedAt: schedule.closedAt || undefined,
            receivedAt: schedule.receivedAt || undefined,
            rescheduledAt: schedule.rescheduledAt || undefined
          },
          invoices
        )

        const { totalVolume, totalWeight, totalValue } = extractTotals(invoices)

        const dischargeTable = createDischargeTable(
          schedule.dischargeTable,
          schedule.dischargeTable.id
        )

        result.push(
          createSchedule(
            {
              priority: schedule.priority,
              scheduledAt: schedule.scheduledAt,
              shippingName: String(schedule.shippingName),
              assistant: schedule.assistant || undefined,
              canceledAt: schedule.canceledAt || undefined,
              chargeType: schedule.chargeType || undefined,
              closedAt: schedule.closedAt || undefined,
              createdAt: schedule.createdAt,
              dischargeValue: schedule.dischargeValue || undefined,
              driver: schedule.driver || undefined,
              freightType: schedule.freightType || undefined,
              lecturer: schedule.lecturer || undefined,
              motive: schedule.motive || undefined,
              palletized: schedule.palletized || undefined,
              paymentMethod: schedule.paymentMethod || undefined,
              pipeSize: schedule.pipeSize || undefined,
              receiptPerInvoice: schedule.receiptPerInvoice || undefined,
              receiptValue: schedule.receiptValue || undefined,
              receivedAt: schedule.receivedAt || undefined,
              rescheduledAt: schedule.rescheduledAt || undefined,
              updatedAt: schedule.updatedAt,
              vehicleSize: schedule.vehicleSize || undefined,
              vehicleType: schedule.vehicleType || undefined,
              dischargeTable,
              invoices,
              situation,
              totalWeight,
              totalVolume,
              totalValue
            },
            schedule.id
          )
        )
      }

      return result
    },

    async findById(id: string): Promise<ISchedule | undefined> {
      const schedule = await prisma.schedules.findOne({
        where: { id },
        include: { dischargeTable: true }
      })

      if (!schedule) {
        return undefined
      }

      if (!schedule.scheduledAt) {
        throw new createHttpError.BadRequest('Agendamento não possui uma data')
      }

      const invoices = await scheduleInvoicesModel.findInvoicesOfSchedule(
        schedule.id
      )

      const { totalVolume, totalWeight, totalValue } = extractTotals(invoices)

      const situation = scheduleSituationsProvider.find(
        {
          scheduledAt: schedule.scheduledAt,
          canceledAt: schedule.canceledAt || undefined,
          closedAt: schedule.closedAt || undefined,
          receivedAt: schedule.receivedAt || undefined,
          rescheduledAt: schedule.rescheduledAt || undefined
        },
        invoices
      )

      const dischargeTable = createDischargeTable(
        schedule.dischargeTable,
        schedule.dischargeTable.id
      )

      return createSchedule(
        {
          priority: schedule.priority,
          scheduledAt: schedule.scheduledAt,
          shippingName: String(schedule.shippingName),
          assistant: schedule.assistant || undefined,
          canceledAt: schedule.canceledAt || undefined,
          chargeType: schedule.chargeType || undefined,
          closedAt: schedule.closedAt || undefined,
          createdAt: schedule.createdAt,
          dischargeValue: schedule.dischargeValue || undefined,
          driver: schedule.driver || undefined,
          freightType: schedule.freightType || undefined,
          lecturer: schedule.lecturer || undefined,
          motive: schedule.motive || undefined,
          palletized: schedule.palletized || undefined,
          paymentMethod: schedule.paymentMethod || undefined,
          pipeSize: schedule.pipeSize || undefined,
          receiptPerInvoice: schedule.receiptPerInvoice || undefined,
          receiptValue: schedule.receiptValue || undefined,
          receivedAt: schedule.receivedAt || undefined,
          rescheduledAt: schedule.rescheduledAt || undefined,
          updatedAt: schedule.updatedAt,
          vehicleSize: schedule.vehicleSize || undefined,
          vehicleType: schedule.vehicleType || undefined,
          dischargeTable,
          invoices,
          situation,
          totalWeight,
          totalVolume,
          totalValue
        },
        schedule.id
      )
    },

    async update(schedule: ISchedule): Promise<ISchedule> {
      const updatedSchedule = await prisma.schedules.update({
        where: { id: schedule.id },
        include: { dischargeTable: true },
        data: {
          ...omit(
            schedule,
            'dischargeTable',
            'scheduleRequest',
            'invoices',
            'situation',
            'rescheduledTo',
            'rescheduledFrom',
            'totalWeight',
            'totalVolume',
            'totalValue'
          ),
          dischargeTable: { connect: { id: schedule.dischargeTable.id } }
        }
      })

      const invoices = await scheduleInvoicesModel.findInvoicesOfSchedule(
        schedule.id
      )

      const situation = scheduleSituationsProvider.find(schedule, invoices)

      const dischargeTable = createDischargeTable(
        schedule.dischargeTable,
        schedule.dischargeTable.id
      )

      const { totalVolume, totalWeight } = extractTotals(invoices)

      return createSchedule(
        {
          ...schedule,
          priority: schedule.priority,
          scheduledAt: schedule.scheduledAt,
          shippingName: String(schedule.shippingName),
          assistant: schedule.assistant || undefined,
          canceledAt: schedule.canceledAt || undefined,
          chargeType: schedule.chargeType || undefined,
          closedAt: schedule.closedAt || undefined,
          createdAt: schedule.createdAt,
          dischargeValue: schedule.dischargeValue || undefined,
          driver: schedule.driver || undefined,
          freightType: schedule.freightType || undefined,
          lecturer: schedule.lecturer || undefined,
          motive: schedule.motive || undefined,
          palletized: schedule.palletized || undefined,
          paymentMethod: schedule.paymentMethod || undefined,
          pipeSize: schedule.pipeSize || undefined,
          receiptPerInvoice: schedule.receiptPerInvoice || undefined,
          receiptValue: schedule.receiptValue || undefined,
          receivedAt: schedule.receivedAt || undefined,
          rescheduledAt: schedule.rescheduledAt || undefined,
          updatedAt: schedule.updatedAt,
          vehicleSize: schedule.vehicleSize || undefined,
          vehicleType: schedule.vehicleType || undefined,
          dischargeTable,
          situation,
          totalVolume,
          totalWeight
        },
        updatedSchedule.id
      )
    },

    async cancel(id: string, motive: string): Promise<ISchedule> {
      const canceledSchedule = await prisma.schedules.update({
        where: { id },
        include: { dischargeTable: true },
        data: { motive, canceledAt: new Date() }
      })

      if (!canceledSchedule.scheduledAt) {
        throw new createHttpError.BadRequest('Agendamento não possui uma data')
      }

      const invoices = await scheduleInvoicesModel.findInvoicesOfSchedule(
        canceledSchedule.id
      )

      const { totalVolume, totalWeight, totalValue } = extractTotals(invoices)

      const situation = scheduleSituationsProvider.find(
        {
          scheduledAt: canceledSchedule.scheduledAt,
          canceledAt: canceledSchedule.canceledAt || undefined,
          closedAt: canceledSchedule.closedAt || undefined,
          receivedAt: canceledSchedule.receivedAt || undefined,
          rescheduledAt: canceledSchedule.rescheduledAt || undefined
        },
        invoices
      )

      const dischargeTable = createDischargeTable(
        canceledSchedule.dischargeTable,
        canceledSchedule.dischargeTable.id
      )

      return createSchedule(
        {
          priority: canceledSchedule.priority,
          scheduledAt: canceledSchedule.scheduledAt,
          shippingName: String(canceledSchedule.shippingName),
          assistant: canceledSchedule.assistant || undefined,
          canceledAt: canceledSchedule.canceledAt || undefined,
          chargeType: canceledSchedule.chargeType || undefined,
          closedAt: canceledSchedule.closedAt || undefined,
          createdAt: canceledSchedule.createdAt,
          dischargeValue: canceledSchedule.dischargeValue || undefined,
          driver: canceledSchedule.driver || undefined,
          freightType: canceledSchedule.freightType || undefined,
          lecturer: canceledSchedule.lecturer || undefined,
          motive: canceledSchedule.motive || undefined,
          palletized: canceledSchedule.palletized || undefined,
          paymentMethod: canceledSchedule.paymentMethod || undefined,
          pipeSize: canceledSchedule.pipeSize || undefined,
          receiptPerInvoice: canceledSchedule.receiptPerInvoice || undefined,
          receiptValue: canceledSchedule.receiptValue || undefined,
          receivedAt: canceledSchedule.receivedAt || undefined,
          rescheduledAt: canceledSchedule.rescheduledAt || undefined,
          updatedAt: canceledSchedule.updatedAt,
          vehicleSize: canceledSchedule.vehicleSize || undefined,
          vehicleType: canceledSchedule.vehicleType || undefined,
          dischargeTable,
          invoices,
          situation,
          totalWeight,
          totalVolume,
          totalValue
        },
        canceledSchedule.id
      )
    },

    async addInvoice(id: string, invoiceId: string): Promise<void> {
      await prisma.schedules.update({
        where: { id },
        data: { invoices: { connect: { id: invoiceId } } }
      })
    },

    async close(schedule: ISchedule): Promise<ISchedule> {
      const updatedSchedule = await prisma.schedules.update({
        where: { id: schedule.id },
        data: { closedAt: new Date() },
        include: { dischargeTable: true }
      })

      if (!updatedSchedule.scheduledAt) {
        throw new createHttpError.BadRequest('Agendamento não possui uma data')
      }

      const situation = scheduleSituationsProvider.find(
        {
          scheduledAt: updatedSchedule.scheduledAt,
          canceledAt: updatedSchedule.canceledAt || undefined,
          closedAt: updatedSchedule.closedAt || undefined,
          receivedAt: updatedSchedule.receivedAt || undefined,
          rescheduledAt: updatedSchedule.rescheduledAt || undefined
        },
        schedule.invoices
      )

      const invoices = await scheduleInvoicesModel.findInvoicesOfSchedule(
        updatedSchedule.id
      )

      const { totalVolume, totalWeight } = extractTotals(invoices)

      const dischargeTable = createDischargeTable(
        updatedSchedule.dischargeTable,
        updatedSchedule.dischargeTable.id
      )

      return createSchedule(
        {
          ...schedule,
          priority: updatedSchedule.priority,
          scheduledAt: updatedSchedule.scheduledAt,
          shippingName: String(updatedSchedule.shippingName),
          assistant: updatedSchedule.assistant || undefined,
          canceledAt: updatedSchedule.canceledAt || undefined,
          chargeType: updatedSchedule.chargeType || undefined,
          closedAt: updatedSchedule.closedAt || undefined,
          createdAt: updatedSchedule.createdAt,
          dischargeValue: updatedSchedule.dischargeValue || undefined,
          driver: updatedSchedule.driver || undefined,
          freightType: updatedSchedule.freightType || undefined,
          lecturer: updatedSchedule.lecturer || undefined,
          motive: updatedSchedule.motive || undefined,
          palletized: updatedSchedule.palletized || undefined,
          paymentMethod: updatedSchedule.paymentMethod || undefined,
          pipeSize: updatedSchedule.pipeSize || undefined,
          receiptPerInvoice: updatedSchedule.receiptPerInvoice || undefined,
          receiptValue: updatedSchedule.receiptValue || undefined,
          receivedAt: updatedSchedule.receivedAt || undefined,
          rescheduledAt: updatedSchedule.rescheduledAt || undefined,
          updatedAt: updatedSchedule.updatedAt,
          vehicleSize: updatedSchedule.vehicleSize || undefined,
          vehicleType: updatedSchedule.vehicleType || undefined,
          dischargeTable,
          invoices,
          totalVolume,
          totalWeight,
          situation
        },
        updatedSchedule.id
      )
    },

    async delete(id: string): Promise<void> {
      await prisma.schedules.delete({ where: { id } })
    },

    async search(scheduledAt: Date, criteria?: string): Promise<ISchedule[]> {
      const schedules = await prisma.schedules.findMany({
        include: { dischargeTable: true },
        where: {
          scheduledAt: {
            gte: startOfDay(scheduledAt),
            lte: endOfDay(scheduledAt)
          },
          receivedAt: null,
          rescheduledAt: null,
          shippingName: criteria
            ? { contains: criteria, mode: 'insensitive' }
            : undefined
        }
      })

      const result: ISchedule[] = []

      for (let i = 0; i < schedules.length; i++) {
        const schedule = schedules[i]

        if (!schedule.scheduledAt) {
          throw new createHttpError.BadRequest(
            'Agendamento não possui uma data'
          )
        }

        const invoices = await scheduleInvoicesModel.findInvoicesOfSchedule(
          schedule.id
        )

        const situation = scheduleSituationsProvider.find(
          {
            scheduledAt: schedule.scheduledAt,
            canceledAt: schedule.canceledAt || undefined,
            closedAt: schedule.closedAt || undefined,
            receivedAt: schedule.receivedAt || undefined,
            rescheduledAt: schedule.rescheduledAt || undefined
          },
          invoices
        )

        const { totalVolume, totalWeight, totalValue } = extractTotals(invoices)

        const dischargeTable = createDischargeTable(
          schedule.dischargeTable,
          schedule.dischargeTable.id
        )

        result.push(
          createSchedule(
            {
              priority: schedule.priority,
              scheduledAt: schedule.scheduledAt,
              shippingName: String(schedule.shippingName),
              assistant: schedule.assistant || undefined,
              canceledAt: schedule.canceledAt || undefined,
              chargeType: schedule.chargeType || undefined,
              closedAt: schedule.closedAt || undefined,
              createdAt: schedule.createdAt,
              dischargeValue: schedule.dischargeValue || undefined,
              driver: schedule.driver || undefined,
              freightType: schedule.freightType || undefined,
              lecturer: schedule.lecturer || undefined,
              motive: schedule.motive || undefined,
              palletized: schedule.palletized || undefined,
              paymentMethod: schedule.paymentMethod || undefined,
              pipeSize: schedule.pipeSize || undefined,
              receiptPerInvoice: schedule.receiptPerInvoice || undefined,
              receiptValue: schedule.receiptValue || undefined,
              receivedAt: schedule.receivedAt || undefined,
              rescheduledAt: schedule.rescheduledAt || undefined,
              updatedAt: schedule.updatedAt,
              vehicleSize: schedule.vehicleSize || undefined,
              vehicleType: schedule.vehicleType || undefined,
              dischargeTable,
              invoices,
              situation,
              totalWeight,
              totalVolume,
              totalValue
            },
            schedule.id
          )
        )
      }

      return result
    }
  }
}
