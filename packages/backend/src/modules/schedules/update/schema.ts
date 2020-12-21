import { Freight, Vehicle } from '@prisma/client'
import * as Yup from 'yup'

const Freights = [Freight.CIF, Freight.FOB]
const Vehicles = [Vehicle.INTERNAL, Vehicle.EXTERNAL]

export const updateSchedulesSchema = Yup.object().shape({
  priority: Yup.bool(),

  shippingName: Yup.string(),

  freightType: Yup.string().oneOf(Freights, 'O Tipo do frete é inválido'),

  vehicleType: Yup.string().oneOf(Vehicles, 'O Tipo do veículo é inválido')
})
