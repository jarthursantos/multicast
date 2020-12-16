import * as Yup from 'yup'

export const cancelAccompanimentsSchema = Yup.object().shape({
  motive: Yup.string().required('O motivo é obrigatório')
})
