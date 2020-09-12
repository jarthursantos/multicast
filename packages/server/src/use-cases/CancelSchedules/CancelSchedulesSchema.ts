import * as Yup from 'yup'

export const cancelSchedulesSchema = Yup.object().shape({
  motive: Yup.string().required()
})
