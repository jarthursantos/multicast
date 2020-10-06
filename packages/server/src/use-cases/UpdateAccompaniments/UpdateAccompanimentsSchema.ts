import { format } from 'date-fns'
import * as Yup from 'yup'

export const updateAccompanimentsSchema = Yup.object().shape({
  releasedAt: Yup.date()
    .nullable()
    .when(
      'expectedBillingAt',
      (expectedBillingAt: Date, releasedAt: Yup.DateSchema<Date>) => {
        return expectedBillingAt
          ? releasedAt.required('Campo obrigatório')
          : releasedAt
      }
    ),

  expectedBillingAt: Yup.date()
    .nullable()
    .min(Yup.ref('releasedAt'), buildMinMessage)
    .when(
      'emittedAt',
      (emittedAt: Date, expectedBillingAt: Yup.DateSchema<Date>) => {
        return emittedAt
          ? expectedBillingAt.required('Campo obrigatório')
          : expectedBillingAt
      }
    ),

  emittedAt: Yup.date()
    .nullable()
    .min(Yup.ref('expectedBillingAt'), buildMinMessage)
    .when(
      'schedulingAt',
      (schedulingAt: Date, emittedAt: Yup.DateSchema<Date>) => {
        return schedulingAt
          ? emittedAt.required('Campo obrigatório')
          : emittedAt
      }
    ),

  number: Yup.number()
    .integer()
    .transform(value => value || null)
    .nullable()
    .when(
      'schedulingAt',
      (schedulingAt: Date, number: Yup.DateSchema<Date>) => {
        return schedulingAt ? number.required('Campo obrigatório') : number
      }
    ),

  value: Yup.number()
    .transform(value => value || null)
    .nullable()
    .when('schedulingAt', (schedulingAt: Date, value: Yup.DateSchema<Date>) => {
      return schedulingAt ? value.required('Campo obrigatório') : value
    }),

  freeOnBoardAt: Yup.date()
    .nullable()
    .min(Yup.ref('emittedAt'), buildMinMessage),

  schedulingAt: Yup.date().nullable().min(Yup.ref('emittedAt'), buildMinMessage)
})

function buildMinMessage({ path, min }: { path: string; min: string | Date }) {
  if (!min) {
    return `${path} have unreported dependencies`
  }

  return `${path} field must be later than or equal to ${
    min instanceof Date ? format(min, 'dd/MM/yyyy') : min
  }`
}
