import * as Yup from 'yup'

export const rescheduleSchedulesSchema = Yup.object().shape({
  scheduledAt: Yup.date()
    .typeError('A Data do Agendamento é obrigatória')
    .required('A Data do Agendamento é obrigatória')
})
