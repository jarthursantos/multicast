import * as Yup from 'yup'

export const schema = Yup.object().shape({
  scheduledAt: Yup.date().required('')
})
