import * as Yup from 'yup'

export const schema = Yup.object().shape({
  motive: Yup.string()
    .min(1, 'O Campo é obrigatório')
    .required('O Campo é obrigatório')
})
