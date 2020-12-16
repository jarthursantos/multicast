import * as Yup from 'yup'

export const createAccompanimentAnnotationsSchema = Yup.object().shape({
  content: Yup.string().required('O conteúdo é obrigatório')
})
