import * as Yup from 'yup'

export const schema = Yup.object().shape({
  date: Yup.date().typeError('Data obrigatória').required('Data obrigatória'),

  buyer: Yup.array()
    .of(
      Yup.object().shape({
        code: Yup.number().integer().required()
      })
    )
    .required('Comprador obrigatório'),

  providers: Yup.array()
    .of(
      Yup.object().shape({
        code: Yup.number().integer().required()
      })
    )
    .required('Fornecedor(es) obrigatório'),

  startTime: Yup.object()
    .shape({
      hour: Yup.number().integer().required('!'),
      minute: Yup.number().integer().required('!')
    })
    .required('!'),

  endTime: Yup.object()
    .shape({
      hour: Yup.number().integer().required('!'),
      minute: Yup.number().integer().required('!')
    })
    .required('!')
})
