import * as Yup from 'yup'

export const schema = Yup.object().shape({
  motive: Yup.string()
    .min(1, 'Motivo obrigatório')
    .required('Motivo obrigatório')
})
