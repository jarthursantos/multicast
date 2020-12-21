import { Freight, Vehicle } from '@prisma/client'
import * as Yup from 'yup'

const Freights = [Freight.CIF, Freight.FOB]
const Vehicles = [Vehicle.INTERNAL, Vehicle.EXTERNAL]

export const createSchedulesSchema = Yup.object().shape({
  scheduledAt: Yup.date()
    .typeError('A Data do Agendamento é obrigatória')
    .required('A Data do Agendamento é obrigatória'),

  priority: Yup.bool().required('A Prioridade é obrigatória'),

  shippingName: Yup.string().required('A Razão Social é obrigatória'),

  freightType: Yup.string()
    .oneOf(Freights, 'O Tipo do frete é inválido')
    .required('O Tipo do frete é obrigatório'),

  vehicleType: Yup.string()
    .oneOf(Vehicles, 'O Tipo do veículo é inválido')
    .required('O Tipo do veículo é obrigatório')
})
