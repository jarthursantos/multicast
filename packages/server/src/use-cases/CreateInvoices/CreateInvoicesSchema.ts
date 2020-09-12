import * as Yup from 'yup'

export const createInvoicesSchema = Yup.object().shape({
  number: Yup.number().integer().required(),
  providerCode: Yup.number().integer().required(),

  emittedAt: Yup.date().nullable(),

  key: Yup.string(),
  weight: Yup.number(),
  volume: Yup.number(),
  value: Yup.number(),

  cteNumber: Yup.number(),
  cteKey: Yup.string(),

  invoiceFileId: Yup.string(),
  cteFileId: Yup.string()
})
