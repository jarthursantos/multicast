import { Freight, Vehicle } from '@prisma/client'
import * as Yup from 'yup'

const Freights = [Freight.CIF, Freight.FOB]
const Vehicles = [Vehicle.INTERNAL, Vehicle.EXTERNAL]

export const scheduleScheduleRequestsSchema = Yup.object().shape({
  requestedDate: Yup.date()
    .typeError('A Data Solicitada é obrigatória')
    .required('A Data Solicitada é obrigatória'),

  providerCode: Yup.number()
    .integer()
    .required('O Código do Fornecedor é obrigatório'),

  priority: Yup.bool().required('A Prioridade é obrigatória'),

  freightType: Yup.string()
    .oneOf(Freights, 'O Tipo do frete é inválido')
    .required('O Tipo do frete é obrigatório'),

  vehicleType: Yup.string()
    .oneOf(Vehicles, 'O Tipo do veículo é inválido')
    .required('O Tipo do veículo é obrigatório')
})
