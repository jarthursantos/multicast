import * as Yup from 'yup'

export const createSchema = Yup.object().shape({
  requestedDate: Yup.date()
    .typeError('A Data solicitada é obrigatória')
    .required('A Data solicitada é obrigatória'),

  providers: Yup.array()
    .of(
      Yup.object().shape({
        code: Yup.number().integer('O Código é inválido')
      })
    )
    .required('O Fornecedor é obrigatório')
})
