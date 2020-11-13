import { ChargeEntity } from './Change'
import { BaseClient } from './Clients'
import { Emitter } from './Emitter'
import { PaymentPlan } from './PaymentPlan'
import { RCA } from './RCA'
import { Region } from './Region'
import { Supervisor } from './Supervisor'

export interface SupervisorRevenues {
  code: number
}

export interface MonthRevenues {
  code: number
}

export interface DeadlineRevenues {
  code: number
}

export interface EvolutionRevenues {
  code: number
}

export interface ClassRevenues {
  code: number
}

export interface RegionRevenues {
  code: number
}

export interface EmitterRevenues {
  code: number
}

export interface AnaliticRevenues {
  number: number
  client: BaseClient
  averageTime: number
  rca: RCA
  emittedAt: Date
  salesValue: number
  profitValue: number
  tableValue: number
  bonificationValue: number
  financialCostValue: number
  supervisor: Supervisor
  emitter: Emitter
  charge: ChargeEntity
  region: Region
  boxNumber: number
  paymentPlan: PaymentPlan
  anotherCostValue: number
  freightValue: number
}

export interface ChargeRevenues {
  code: number
}

export interface CheckOutRevenues {
  code: number
}

export interface SalesOriginRevenues {
  code: number
}

export interface ActuationAreaRevenues {
  code: string
}

export interface ProviderRevenues {
  code: number
}
