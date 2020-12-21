import { PrismaClient } from '@prisma/client'
import { endOfDay, startOfDay } from 'date-fns'
import { DischargeTable } from 'entities/DischargeTable'
import { Invoice } from 'entities/Invoice'
import { Schedule } from 'entities/Schedule'
import { omit } from 'lodash'
import { IScheduleSituationsProvider } from 'providers/IScheduleSituationsProvider'
import { IScheduleInvoicesRepository } from 'repositories/IScheduleInvoicesRepository'
import { ISchedulesRepository } from 'repositories/ISchedulesRepository'

export class PrismaSchedulesRepository implements ISchedulesRepository {
  private prisma = new PrismaClient()

  constructor(
    private scheduleInvoicesRepository: IScheduleInvoicesRepository,
    private scheduleSituationsProvider: IScheduleSituationsProvider
  ) {}

  async save(schedule: Schedule): Promise<void> {
    await this.prisma.schedules.create({
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
          'dischargeTable'
        ),
        dischargeTable: { connect: { id: schedule.dischargeTable.id } }
      }
    })
  }

  async findMany(): Promise<Schedule[]> {
    const schedules = await this.prisma.schedules.findMany({
      include: { dischargeTable: true }
    })

    const result: Schedule[] = []

    for (let i = 0; i < schedules.length; i++) {
      const schedule = schedules[i]

      const invoices = await this.scheduleInvoicesRepository.findInvoicesOfSchedule(
        schedule.id
      )

      const situation = this.scheduleSituationsProvider.find(schedule, invoices)

      const { totalVolume, totalWeight } = this.extractTotals(invoices)

      const dischargeTable = new DischargeTable(
        schedule.dischargeTable,
        schedule.dischargeTable.id
      )

      result.push(
        new Schedule(
          {
            ...schedule,
            dischargeTable,
            invoices,
            situation,
            totalWeight,
            totalVolume
          },
          schedule.id
        )
      )
    }

    return result
  }

  async findReceivedsFromPeriod(
    periodStart: Date,
    periodEnd: Date
  ): Promise<Schedule[]> {
    const schedules = await this.prisma.schedules.findMany({
      where: {
        NOT: { receivedAt: null },
        scheduledAt: { gte: startOfDay(periodStart), lte: endOfDay(periodEnd) },
        rescheduledAt: null,
        canceledAt: null
      },
      include: { dischargeTable: true }
    })

    const result: Schedule[] = []

    for (let i = 0; i < schedules.length; i++) {
      const schedule = schedules[i]

      const invoices = await this.scheduleInvoicesRepository.findInvoicesOfSchedule(
        schedule.id
      )

      const situation = this.scheduleSituationsProvider.find(schedule, invoices)

      const { totalVolume, totalWeight } = this.extractTotals(invoices)

      const dischargeTable = new DischargeTable(
        schedule.dischargeTable,
        schedule.dischargeTable.id
      )

      result.push(
        new Schedule(
          {
            ...schedule,
            dischargeTable,
            invoices,
            situation,
            totalWeight,
            totalVolume
          },
          schedule.id
        )
      )
    }

    return result
  }

  async findById(id: string): Promise<Schedule> {
    const schedule = await this.prisma.schedules.findOne({
      where: { id },
      include: { dischargeTable: true }
    })

    if (!schedule) {
      return undefined
    }

    const invoices = await this.scheduleInvoicesRepository.findInvoicesOfSchedule(
      schedule.id
    )

    const { totalVolume, totalWeight } = this.extractTotals(invoices)

    const situation = this.scheduleSituationsProvider.find(schedule, invoices)

    const dischargeTable = new DischargeTable(
      schedule.dischargeTable,
      schedule.dischargeTable.id
    )
    return new Schedule(
      {
        ...schedule,
        dischargeTable,
        invoices,
        situation,
        totalWeight,
        totalVolume
      },
      schedule.id
    )
  }

  async update(schedule: Schedule): Promise<Schedule> {
    const updatedSchedule = await this.prisma.schedules.update({
      where: { id: schedule.id },
      include: { dischargeTable: true },
      data: {
        ...omit(
          schedule,
          'scheduledAt',
          'dischargeTable',
          'scheduleRequest',
          'invoices',
          'situation',
          'rescheduledTo',
          'rescheduledFrom',
          'totalWeight',
          'totalVolume'
        ),
        dischargeTable: { connect: { id: schedule.dischargeTable.id } }
      }
    })

    const invoices = await this.scheduleInvoicesRepository.findInvoicesOfSchedule(
      schedule.id
    )

    const situation = this.scheduleSituationsProvider.find(schedule, invoices)

    const { totalVolume, totalWeight } = this.extractTotals(invoices)

    return new Schedule(
      {
        ...schedule,
        ...updatedSchedule,
        invoices,
        situation,
        totalVolume,
        totalWeight
      },
      updatedSchedule.id
    )
  }

  async cancel(id: string, motive: string): Promise<Schedule> {
    const canceledSchedule = await this.prisma.schedules.update({
      where: { id },
      include: { dischargeTable: true },
      data: { motive, canceledAt: new Date() }
    })

    const invoices = await this.scheduleInvoicesRepository.findInvoicesOfSchedule(
      canceledSchedule.id
    )

    const { totalVolume, totalWeight } = this.extractTotals(invoices)

    const situation = this.scheduleSituationsProvider.find(
      canceledSchedule,
      invoices
    )

    const dischargeTable = new DischargeTable(
      canceledSchedule.dischargeTable,
      canceledSchedule.dischargeTable.id
    )

    return new Schedule(
      {
        ...canceledSchedule,
        dischargeTable,
        invoices,
        situation,
        totalWeight,
        totalVolume
      },
      canceledSchedule.id
    )
  }

  async addInvoice(id: string, invoiceId: string): Promise<void> {
    await this.prisma.schedules.update({
      where: { id },
      data: { invoices: { connect: { id: invoiceId } } }
    })
  }

  async close(schedule: Schedule): Promise<Schedule> {
    const updatedSchedule = await this.prisma.schedules.update({
      where: { id: schedule.id },
      data: { closedAt: new Date() }
    })

    const situation = this.scheduleSituationsProvider.find(
      updatedSchedule,
      schedule.invoices
    )

    return new Schedule(
      { ...schedule, ...updatedSchedule, situation },
      updatedSchedule.id
    )
  }

  private extractTotals(invoices: Invoice[]) {
    const totalWeight = invoices.reduce(
      (currentWeight, { weight }) => currentWeight + weight,
      0
    )

    const totalVolume = invoices.reduce(
      (currentVolume, { volume }) => currentVolume + volume,
      0
    )

    return {
      totalWeight,
      totalVolume
    }
  }
}
