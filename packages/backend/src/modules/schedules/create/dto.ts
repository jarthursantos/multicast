import { Freight, Vehicle } from '@prisma/client'

export interface ICreateSchedulesDTO {
  scheduledAt: Date | string
  shippingName: string
  priority: boolean
  freightType: Freight
  vehicleType: Vehicle
}
