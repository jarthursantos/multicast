import { Freight, Vehicle, Size, Charge, Receipt } from '@prisma/client'
import { Schedule } from 'entities/Schedule'
import { pick } from 'lodash'

export class ScheduleHistory {
  public schedule: Schedule

  public scheduledAt: Date
  public shippingName: string
  public priority: boolean

  public freightType: Freight
  public vehicleType: Vehicle

  public lecturer?: string
  public driver?: string
  public vehicleSize?: Size
  public chargeType?: Charge
  public palletized?: boolean
  public assistant?: boolean
  public pipeSize?: Size
  public receiptPerInvoice?: boolean

  public dischargeValue?: number
  public receiptValue?: number
  public paymentMethod?: Receipt

  public closedAt?: Date
  public receivedAt?: Date

  public rescheduledAt?: Date

  public canceledAt?: Date
  public motive?: string

  constructor(schedule: Schedule, props: Omit<ScheduleHistory, 'schedule'>) {
    Object.assign(
      this,
      pick(
        props,

        'scheduledAt',
        'shippingName',
        'priority',

        'freightType',
        'vehicleType',

        'lecturer',
        'driver',
        'vehicleSize',
        'chargeType',
        'palletized',
        'assistant',
        'pipeSize',
        'receiptPerInvoice',

        'dischargeValue',
        'receiptValue',
        'paymentMethod',

        'closedAt',
        'receivedAt',

        'rescheduledAt',

        'canceledAt',
        'motive'
      )
    )

    this.schedule = schedule
  }
}
