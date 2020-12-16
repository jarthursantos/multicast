import { Freight, Vehicle } from '@prisma/client'

export interface IUpdateSchedulesDTO {
  scheduledAt?: Date | string
  shippingName?: string
  priority?: boolean
  freightType?: Freight
  vehicleType?: Vehicle
}
