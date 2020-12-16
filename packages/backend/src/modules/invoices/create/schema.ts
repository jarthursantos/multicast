import * as Yup from 'yup'

export const createInvoicesSchema = Yup.object().shape({
  number: Yup.number()
    .transform(value => value || undefined)
    .integer()
    .required(),
  providerCode: Yup.number()
    .transform(value => value || undefined)
    .integer()
    .required(),

  emittedAt: Yup.date().nullable(),

  importation: Yup.boolean().required(),

  key: Yup.string(),
  weight: Yup.number().transform(value => value || undefined),
  volume: Yup.number().transform(value => value || undefined),
  value: Yup.number().transform(value => value || undefined),

  cteNumber: Yup.number().transform(value => value || undefined),
  cteKey: Yup.string(),

  invoiceFileId: Yup.string(),
  cteFileId: Yup.string()
})
