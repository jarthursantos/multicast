import * as Yup from 'yup'

export const schema = Yup.object().shape({
  date: Yup.date().typeError('Campo obrigatório').required('Campo obrigatório'),

  buyer: Yup.array()
    .of(
      Yup.object().shape({
        code: Yup.number().integer().required()
      })
    )
    .required('Campo obrigatório'),

  hour: Yup.number().integer().required('Campo obrigatório'),

  representative: Yup.number().integer().required('Campo obrigatório'),

  representeds: Yup.array()
    .of(
      Yup.object().shape({
        code: Yup.number().integer().required()
      })
    )
    .required('Campo obrigatório')
})
