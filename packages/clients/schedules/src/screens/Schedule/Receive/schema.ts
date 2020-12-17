import * as Yup from 'yup'

import { Charge, Receipts, Size } from '~/store/modules/schedules/types'

const Sizes: Size[] = ['SMALL', 'MEDIUM', 'LARGE']
const Charges: Charge[] = ['BEAT', 'VOLUME', 'PIPE']
const PaymentMethods: Receipts[] = ['DEPOSIT', 'MONEY', 'PENDING']

export const perScheduleSchema = Yup.object().shape({
  lecturer: Yup.string().required('Obrigatório'),

  driver: Yup.string().required('Obrigatório'),

  vehicleSize: Yup.string().oneOf(Sizes, 'Obrigatório').required('Obrigatório'),

  chargeType: Yup.string().oneOf(Charges).required('Obrigatório'),

  paymentMethod: Yup.string().oneOf(PaymentMethods).required('Obrigatório'),

  palletized: Yup.boolean().when(
    'chargeType',
    (chargeType: string, palletized: Yup.StringSchema) => {
      return chargeType !== 'PIPE' ? palletized.required() : palletized
    }
  ),

  assistant: Yup.boolean().when(
    'chargeType',
    (chargeType: string, assistant: Yup.StringSchema) => {
      return chargeType !== 'PIPE' ? assistant.required() : assistant
    }
  ),

  pipeSize: Yup.string()
    .oneOf(Sizes)
    .when('chargeType', (chargeType: string, pipeSize: Yup.StringSchema) => {
      return chargeType === 'PIPE' ? pipeSize.required() : pipeSize
    }),

  receiptValue: Yup.number()
    .transform(value => value || undefined)
    .required('Obrigatório')
    .min(0)
})

export const perInvoiceSchema = Yup.object().shape({
  lecturer: Yup.string().required('Obrigatório'),

  driver: Yup.string().required('Obrigatório'),

  vehicleSize: Yup.string().oneOf(Sizes, 'Obrigatório').required('Obrigatório'),

  chargeType: Yup.string().oneOf(Charges).required(),

  paymentMethod: Yup.string().oneOf(PaymentMethods).required(),

  palletized: Yup.boolean().when(
    'chargeType',
    (chargeType: string, palletized: Yup.StringSchema) => {
      return chargeType !== 'PIPE' ? palletized.required() : palletized
    }
  ),

  assistant: Yup.boolean().when(
    'chargeType',
    (chargeType: string, assistant: Yup.StringSchema) => {
      return chargeType !== 'PIPE' ? assistant.required() : assistant
    }
  ),

  pipeSize: Yup.string()
    .oneOf(Sizes)
    .when('chargeType', (chargeType: string, pipeSize: Yup.StringSchema) => {
      return chargeType === 'PIPE' ? pipeSize.required() : pipeSize
    }),

  invoices: Yup.array()
    .of(
      Yup.object().shape({
        id: Yup.string().required(),
        divergence: Yup.string().required(),
        receiptValue: Yup.number()
          .transform(value => value || undefined)
          .when(
            'divergence',
            (divergence: string, receiptValue: Yup.NumberSchema) => {
              return divergence !== 'NOT_RECEIVED'
                ? receiptValue.required()
                : receiptValue
            }
          )
      })
    )
    .required()
})
