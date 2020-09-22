import * as Yup from 'yup'

export const authSchema = Yup.object().shape({
  email: Yup.string().email().required()
})
