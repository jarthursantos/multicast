import * as Yup from 'yup'

export const schema = Yup.object().shape({
  content: Yup.string()
    .min(1, 'Campo obrigatório')
    .required('Campo obrigatório')
})
