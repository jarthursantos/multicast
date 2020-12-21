import { Freight, Vehicle, Size, Charge, Receipt } from '@prisma/client'

import { ISchedule } from './ISchedule'

export interface IScheduleChanges {
  schedule: ISchedule

  scheduledAt: Date
  shippingName: string
  priority: boolean

  freightType: Freight
  vehicleType: Vehicle

  lecturer?: string
  driver?: string
  vehicleSize?: Size
  chargeType?: Charge
  palletized?: boolean
  assistant?: boolean
  pipeSize?: Size
  receiptPerInvoice?: boolean

  dischargeValue?: number
  receiptValue?: number
  paymentMethod?: Receipt

  closedAt?: Date
  receivedAt?: Date

  rescheduledAt?: Date

  canceledAt?: Date
  motive?: string
}
export function createScheduleChanges(
  schedule: ISchedule,
  props: Omit<IScheduleChanges, 'schedule'>
): IScheduleChanges {
  return {
    schedule,
    scheduledAt: props.scheduledAt,
    shippingName: props.shippingName,
    priority: props.priority,
    freightType: props.freightType,
    vehicleType: props.vehicleType,
    lecturer: props.lecturer,
    driver: props.driver,
    vehicleSize: props.vehicleSize,
    chargeType: props.chargeType,
    palletized: props.palletized,
    assistant: props.assistant,
    pipeSize: props.pipeSize,
    receiptPerInvoice: props.receiptPerInvoice,
    dischargeValue: props.dischargeValue,
    receiptValue: props.receiptValue,
    paymentMethod: props.paymentMethod,
    closedAt: props.closedAt,
    receivedAt: props.receivedAt,
    rescheduledAt: props.rescheduledAt,
    canceledAt: props.canceledAt,
    motive: props.motive
  }
}
