import { PrismaClient } from '@prisma/client'
import { Invoice } from 'entities/Invoice'
import { RescheduleResult } from 'entities/RescheduleResult'
import { Schedule } from 'entities/Schedule'
import { omit } from 'lodash'
import { IScheduleSituationsProvider } from 'providers/IScheduleSituationsProvider'
import { IRescheduleInvoicesRepository } from 'repositories/IRescheduleInvoicesRepository'
import { IRescheduleSchedulesRepository } from 'repositories/IRescheduleSchedulesRepository'
import { IScheduleInvoicesRepository } from 'repositories/IScheduleInvoicesRepository'

export class PrismaRescheduleSchedulesRepository
  implements IRescheduleSchedulesRepository {
  private prisma = new PrismaClient()

  constructor(
    private scheduleInvoicesRepository: IScheduleInvoicesRepository,
    private scheduleSituationsProvider: IScheduleSituationsProvider,
    private rescheduleInvoicesRepository: IRescheduleInvoicesRepository
  ) {}

  async reschedule(
    schedule: Schedule,
    newDate: Date
  ): Promise<RescheduleResult> {
    const rescheduleData = new Schedule({
      ...omit(schedule, 'id'),
      scheduledAt: newDate
    })

    const reschedule = await this.prisma.schedules.create({
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
          'totalVolume'
        ),
        rescheduledFrom: { connect: { id: schedule.id } },
        dischargeTable: { connect: { id: schedule.dischargeTable.id } }
      }
    })

    const updatedSchedule = await this.prisma.schedules.update({
      where: { id: schedule.id },
      data: {
        rescheduledAt: new Date(),
        rescheduledTo: { connect: { id: reschedule.id } }
      }
    })

    const invoices = await this.scheduleInvoicesRepository.findInvoicesOfSchedule(
      schedule.id
    )

    const rescheduledInvoices = await this.rescheduleInvoicesRepository.reschedule(
      invoices,
      reschedule.id
    )

    const rescheduleSituation = this.scheduleSituationsProvider.find(
      reschedule,
      invoices
    )

    const updatedSituation = this.scheduleSituationsProvider.find(
      updatedSchedule,
      rescheduledInvoices
    )

    return {
      schedule: new Schedule(
        {
          ...schedule,
          ...updatedSchedule,
          invoices,
          situation: updatedSituation,
          ...this.extractTotals(invoices)
        },
        schedule.id
      ),
      reschedule: new Schedule(
        {
          ...schedule,
          ...reschedule,
          invoices: rescheduledInvoices,
          situation: rescheduleSituation,
          ...this.extractTotals(rescheduledInvoices)
        },
        reschedule.id
      )
    }
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
