import { Freight, Vehicle } from '@prisma/client'

export interface CreateSchedulesRequestDTO {
  scheduledAt: string
  shippingName: string
  priority: boolean
  freightType: Freight
  vehicleType: Vehicle
}
