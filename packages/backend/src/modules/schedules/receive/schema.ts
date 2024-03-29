import { Size, Charge, Receipt } from '@prisma/client'
import * as Yup from 'yup'

const Sizes = [Size.SMALL, Size.MEDIUM, Size.LARGE]
const Charges = [Charge.BEAT, Charge.VOLUME, Charge.PIPE]
const Receipts = [Receipt.DEPOSIT, Receipt.MONEY, Receipt.PENDING]

export const receiveSchedulesSchema = Yup.object().shape({
  receiptPerInvoice: Yup.bool().required(),

  lecturer: Yup.string().required(),

  driver: Yup.string().required(),

  vehicleSize: Yup.string().oneOf(Sizes).required(),

  chargeType: Yup.string().oneOf(Charges).required(),

  paymentMethod: Yup.string().oneOf(Receipts).required(),

  palletized: Yup.boolean().when(
    'chargeType',
    (chargeType: string, palletized: Yup.StringSchema) => {
      return chargeType !== Charge.PIPE ? palletized.required() : palletized
    }
  ),

  assistant: Yup.boolean().when(
    'chargeType',
    (chargeType: string, assistant: Yup.StringSchema) => {
      return chargeType !== Charge.PIPE ? assistant.required() : assistant
    }
  ),

  pipeSize: Yup.string()
    .oneOf(Sizes)
    .when('chargeType', (chargeType: string, pipeSize: Yup.StringSchema) => {
      return chargeType === Charge.PIPE ? pipeSize.required() : pipeSize
    }),

  receiptValue: Yup.number().min(0)
})
