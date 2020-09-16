import * as Yup from 'yup'

export const generateScheduleCostsReportsSchema = Yup.object().shape({
  periodStart: Yup.date()
    .typeError('A Inicio do período é obrigatório')
    .required('A Inicio do período é obrigatório'),

  periodEnd: Yup.date()
    .typeError('A Fim do período é obrigatório')
    .required('A Fim do período é obrigatório')
})
