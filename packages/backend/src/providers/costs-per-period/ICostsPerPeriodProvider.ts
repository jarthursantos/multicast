import { Receipt } from '@prisma/client'

import { IFile } from '~/domain/IFile'

interface IScheduleData {
  shippingName: string
  paymentMethod?: Receipt
  dischargeValue: number
  receiptValue: number
}

export interface ICostPerPeriodData {
  periodStart: Date
  periodEnd: Date
  schedules: IScheduleData[]
  dischargeAmount: number
  receiptAmount: number
}

export interface ICostsPerPeriodProvider {
  generate(data: ICostPerPeriodData): Promise<IFile>
}
