import { Receipt } from '@prisma/client'
import { File } from 'entities/File'

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

export interface ICostPerPeriodProvider {
  generate(data: ICostPerPeriodData): Promise<File>
}
