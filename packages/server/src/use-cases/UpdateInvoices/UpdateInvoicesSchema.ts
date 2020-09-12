import * as Yup from 'yup'

export const updateInvoicesSchema = Yup.object().shape({
  number: Yup.number().integer().required(),
  providerCode: Yup.number().integer().required(),

  emittedAt: Yup.date().nullable(),

  key: Yup.string().nullable(),
  weight: Yup.number().nullable(),
  volume: Yup.number().nullable(),
  value: Yup.number().nullable(),

  cteNumber: Yup.number().nullable(),
  cteKey: Yup.string().nullable(),

  invoiceFileId: Yup.string().nullable(),
  cteFileId: Yup.string().nullable()
})
