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
    .min(Yup.ref('releasedAt'), ({ path, min }) =>
      buildMinMessage({ min, path })
    )
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
    .min(Yup.ref('expectedBillingAt'), ({ path, min }) =>
      buildMinMessage({ min, path })
    )
    .when(
      'transactionNumber',
      (transactionNumber: number, billingAt: Yup.DateSchema<Date>) => {
        return transactionNumber
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
    .min(Yup.ref('billingAt'), ({ path, min }) =>
      buildMinMessage({ min, path })
    ),

  schedulingAt: Yup.date()
    .nullable()
    .min(Yup.ref('billingAt'), ({ path, min }) =>
      buildMinMessage({ min, path })
    )
})

function buildMinMessage({
  path,
  min
}: {
  path: string | undefined
  min: string | Date
}) {
  if (!min) {
    return `${path} have unreported dependencies`
  }

  return `${path} field must be later than or equal to ${
    min instanceof Date ? format(min, 'dd/MM/yyyy') : min
  }`
}
