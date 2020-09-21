import * as Yup from 'yup'

export const schema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'O campo nome precisar ter no mínimo 3 letras')
    .required('O campo nome é obrigatório')
})
