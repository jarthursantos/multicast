import * as Yup from 'yup'

export const updateScheduleRequestsSchema = Yup.object().shape({
  requestedDate: Yup.date()
    .typeError('A Data Solicitada é obrigatória')
    .required('A Data Solicitada é obrigatória'),
  providerCode: Yup.number()
    .integer()
    .required('O Código do Fornecedor é obrigatório')
})
