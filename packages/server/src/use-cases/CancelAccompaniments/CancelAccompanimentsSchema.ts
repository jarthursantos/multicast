import * as Yup from 'yup'

export const cancelAccompanimentSchema = Yup.object().shape({
  motive: Yup.string().required()
})
