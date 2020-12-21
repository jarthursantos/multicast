import { IChargeEntity } from './IChange'
import { IBaseClient } from './IClient'
import { IEmitter } from './IEmitter'
import { IPaymentPlan } from './IPaymentPlan'
import { IRCA } from './IRCA'
import { IRegion } from './IRegion'
import { ISupervisor } from './ISupervisor'

export interface ISupervisorRevenues {
  code: number
}

export interface IMonthRevenues {
  code: number
}

export interface IDeadlineRevenues {
  code: number
}

export interface IEvolutionRevenues {
  code: number
}

export interface IClassRevenues {
  code: number
}

export interface IRegionRevenues {
  code: number
}

export interface IEmitterRevenues {
  code: number
}

export interface IAnaliticRevenues {
  number: number
  client: IBaseClient
  averageTime: number
  rca: IRCA
  emittedAt: Date
  salesValue: number
  profitValue: number
  tableValue: number
  bonificationValue: number
  financialCostValue: number
  supervisor: ISupervisor
  emitter: IEmitter
  charge: IChargeEntity
  region: IRegion
  boxNumber: number
  paymentPlan: IPaymentPlan
  anotherCostValue: number
  freightValue: number
}

export interface IChargeRevenues {
  code: number
}

export interface ICheckOutRevenues {
  code: number
}

export interface ISalesOriginRevenues {
  code: number
}

export interface IActuationAreaRevenues {
  code: string
}

export interface IProviderRevenues {
  code: number
}
