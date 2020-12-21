import createHttpError from 'http-errors'

import { ISchedulesModel } from '~/models/schedules/ISchedulesModel'
import { ICostsPerPeriodProvider } from '~/providers/costs-per-period/ICostsPerPeriodProvider'

import { IScheduleCostReportOptions } from './parser'

export function createScheduleCostsReportModule(
  schedulesModel: ISchedulesModel,
  costsPerPeriodProvider: ICostsPerPeriodProvider
) {
  return {
    async execute(data?: IScheduleCostReportOptions) {
      if (!data) {
        throw new createHttpError.BadRequest(
          'Os parâmetros informados são inválidos'
        )
      }

      const { periodEnd, periodStart } = data

      const schedules = await schedulesModel.findReceivedsFromPeriod(
        periodStart,
        periodEnd
      )

      const dischargeAmount = schedules.reduce(
        (old, { dischargeValue }) => old + (dischargeValue || 0),
        0
      )

      const receiptAmount = schedules.reduce(
        (old, { receiptValue }) => old + (receiptValue || 0),
        0
      )

      const report = await costsPerPeriodProvider.generate({
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
}
