import { format } from 'date-fns'
import * as Yup from 'yup'

// TODO
export const updateAccompanimentsSchema = Yup.object().shape({
  releasedAt: Yup.date()
    .nullable()
    .when(
      'expectedBillingAt',
      (expectedBillingAt: Date, releasedAt: Yup.DateSchema<Date>) => {
        return expectedBillingAt ? releasedAt.required() : releasedAt
      }
    ),

  expectedBillingAt: Yup.date()
    .nullable()
    .min(Yup.ref('releasedAt'), buildMinMessage)
    .when(
      'billingAt',
      (billingAt: Date, expectedBillingAt: Yup.DateSchema<Date>) => {
        return billingAt ? expectedBillingAt.required() : expectedBillingAt
      }
    ),

  billingAt: Yup.date()
    .nullable()
    .min(Yup.ref('expectedBillingAt'), buildMinMessage)
    .when(
      'schedulingAt',
      (schedulingAt: Date, billingAt: Yup.DateSchema<Date>) => {
        return schedulingAt ? billingAt.required() : billingAt
      }
    ),

  freeOnBoardAt: Yup.date()
    .nullable()
    .min(Yup.ref('billingAt'), buildMinMessage),

  schedulingAt: Yup.date().nullable().min(Yup.ref('billingAt'), buildMinMessage)

  // valueDelivered: Yup.number().when(
  //   'schedulingAt',
  //   (schedulingAt: Date, valueDelivered: Yup.DateSchema<Date>) => {
  //     return schedulingAt ? valueDelivered.required() : valueDelivered
  //   }
  // ),

  // invoiceId: Yup.number()
  //   .integer()
  //   .when(
  //     'schedulingAt',
  //     (schedulingAt: Date, invoiceId: Yup.DateSchema<Date>) => {
  //       return schedulingAt ? invoiceId.required() : invoiceId
  //     }
  //   )
})

function buildMinMessage({ path, min }: { path: string; min: string | Date }) {
  if (!min) {
    return `${path} have unreported dependencies`
  }

  return `${path} field must be later than or equal to ${
    min instanceof Date ? format(min, 'dd/MM/yyyy') : min
  }`
}
