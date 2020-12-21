import * as Yup from 'yup'

export const schema = Yup.object().shape({
  periodStart: Yup.date()
    .typeError('O inicio do período é obrigatório')
    .required('O inicio do período é obrigatório'),

  periodEnd: Yup.date()
    .typeError('O fim período é obrigatório')
    .required('O fim do período é obrigatório')
})
