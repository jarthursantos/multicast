import { format } from 'date-fns'
import * as Yup from 'yup'

export const schema = Yup.object().shape({
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
      'billingAt',
      (billingAt: Date, expectedBillingAt: Yup.DateSchema<Date>) => {
        return billingAt
          ? expectedBillingAt.required('Campo obrigatório')
          : expectedBillingAt
      }
    ),

  billingAt: Yup.date()
    .nullable()
    .min(Yup.ref('expectedBillingAt'), buildMinMessage)
    .when(
      'schedulingAt',
      (schedulingAt: Date, billingAt: Yup.DateSchema<Date>) => {
        return schedulingAt
          ? billingAt.required('Campo obrigatório')
          : billingAt
      }
    ),

  transactionNumber: Yup.number()
    .integer()
    .transform(value => value || null)
    .nullable()
    .when(
      'schedulingAt',
      (schedulingAt: Date, transactionNumber: Yup.DateSchema<Date>) => {
        return schedulingAt
          ? transactionNumber.required('Campo obrigatório')
          : transactionNumber
      }
    ),

  freeOnBoardAt: Yup.date()
    .nullable()
    .min(Yup.ref('billingAt'), buildMinMessage),

  schedulingAt: Yup.date().nullable().min(Yup.ref('billingAt'), buildMinMessage)
})

function buildMinMessage({ min }: { min: string | Date }) {
  if (!min) {
    return 'Há campos que precisam ser preenchidos'
  }

  return `Precisa ser após a ${
    min instanceof Date ? format(min, 'dd/MM/yyyy') : min
  }`
}
