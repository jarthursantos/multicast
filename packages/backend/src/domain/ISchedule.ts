import { Freight, Vehicle, Size, Charge, Receipt } from '@prisma/client'
import { v4 as uuid } from 'uuid'

import { IDischargeTable } from './IDischargeTable'
import { IInvoice } from './IInvoice'
import { IScheduleRequest } from './IScheduleRequest'
import { ScheduleSituations } from './ScheduleSituations'

export interface ISchedule {
  readonly id: string

  scheduledAt: Date
  shippingName: string
  priority: boolean

  freightType?: Freight
  vehicleType?: Vehicle

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

  createdAt?: Date
  updatedAt?: Date
  canceledAt?: Date
  motive?: string

  dischargeTable: IDischargeTable
  invoices: IInvoice[]
  situation: ScheduleSituations
  scheduleRequest?: IScheduleRequest

  totalWeight: number
  totalVolume: number

  rescheduledTo?: ISchedule
  rescheduledFrom?: ISchedule
}

export function createSchedule(
  props: Omit<ISchedule, 'id'>,
  id?: string
): ISchedule {
  return {
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
    createdAt: props.createdAt,
    updatedAt: props.updatedAt,
    canceledAt: props.canceledAt,
    motive: props.motive,
    dischargeTable: props.dischargeTable,
    invoices: props.invoices,
    situation: props.situation,
    scheduleRequest: props.scheduleRequest,
    totalWeight: props.totalWeight,
    totalVolume: props.totalVolume,
    rescheduledTo: props.rescheduledTo,
    rescheduledFrom: props.rescheduledFrom,

    id: id || uuid()
  }
}
