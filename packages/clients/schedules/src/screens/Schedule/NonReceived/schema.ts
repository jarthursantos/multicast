import * as Yup from 'yup'

export const schema = Yup.object().shape({
  scheduledAt: Yup.date()
    .typeError('A Data do agendamento é obrigatória')
    .required('A Data do agendamento é obrigatória')
})
