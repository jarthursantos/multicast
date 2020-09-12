import { Freight, Vehicle, Size, Charge, Receipt } from '@prisma/client'
import { DischargeTable } from 'entities/DischargeTable'
import { Invoice } from 'entities/Invoice'
import { ScheduleRequest } from 'entities/ScheduleRequest'
import { ScheduleSituations } from 'entities/ScheduleSituations'
import { pick } from 'lodash'
import { v4 as uuid } from 'uuid'

export class Schedule {
  public readonly id: string

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

  public createdAt?: Date
  public updatedAt?: Date
  public canceledAt?: Date
  public motive?: string

  public dischargeTable: DischargeTable
  public invoices: Invoice[]
  public situation: ScheduleSituations
  public scheduleRequest?: ScheduleRequest

  public totalWeight: number
  public totalVolume: number

  public rescheduledTo?: Schedule
  public rescheduledFrom?: Schedule

  constructor(props: Omit<Schedule, 'id'>, id?: string) {
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
        'createdAt',
        'updatedAt',
        'canceledAt',
        'motive',
        'dischargeTable',
        'invoices',
        'situation',
        'scheduleRequest',
        'totalWeight',
        'totalVolume',
        'rescheduledTo',
        'rescheduledFrom'
      )
    )

    this.id = id || uuid()
  }
}
