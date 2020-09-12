import { Freight, Vehicle } from '@prisma/client'

export interface IUpdateSchedulesRequestDTO {
  shippingName?: string
  priority?: boolean
  freightType?: Freight
  vehicleType?: Vehicle
}
