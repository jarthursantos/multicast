import * as Yup from 'yup'

export const updateSchema = Yup.object().shape({
  scheduledAt: Yup.date()
    .typeError('A Data do agendamento é obrigatória')
    .required('A Data do agendamento é obrigatória'),

  shippingName: Yup.string().required('A Razão Social / Fantasia é obrigatória')
})
