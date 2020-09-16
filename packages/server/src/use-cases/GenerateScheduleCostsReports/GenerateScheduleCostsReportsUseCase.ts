import { parseISO } from 'date-fns'
import { ICostPerPeriodProvider } from 'providers/ICostPerPeriodProvider'
import { ISchedulesRepository } from 'repositories/ISchedulesRepository'

import { IGenerateScheduleCostsReportsRequestDTO } from './GenerateScheduleCostsReportsDTO'

export class GenerateScheduleCostsReportsUseCase {
  constructor(
    private schedulesRepository: ISchedulesRepository,
    private costPerPeriodProvider: ICostPerPeriodProvider
  ) {}

  async execute(data: IGenerateScheduleCostsReportsRequestDTO) {
    const periodStart =
      typeof data.periodStart === 'string'
        ? parseISO(data.periodStart)
        : data.periodStart
    const periodEnd =
      typeof data.periodEnd === 'string'
        ? parseISO(data.periodEnd)
        : data.periodEnd

    const schedules = await this.schedulesRepository.findReceivedsFromPeriod(
      periodStart,
      periodEnd
    )

    const dischargeAmount = schedules.reduce(
      (old, { dischargeValue }) => old + dischargeValue,
      0
    )

    const receiptAmount = schedules.reduce(
      (old, { receiptValue }) => old + receiptValue,
      0
    )

    console.log({ schedules })

    const report = await this.costPerPeriodProvider.generate({
      periodStart,
      periodEnd,
      dischargeAmount,
      receiptAmount,
      schedules: schedules.map(schedule => ({
        dischargeValue: schedule.dischargeValue || 0,
        receiptValue: schedule.receiptValue || 0,
        shippingName: schedule.shippingName,
        paymentMethod: schedule.paymentMethod
      }))
    })

    return report
  }
}
