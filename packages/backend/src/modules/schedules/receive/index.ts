import createHttpError from 'http-errors'
import { pick } from 'lodash'

import { createInvoice, IInvoice } from '~/domain/IInvoice'
import { createSchedule } from '~/domain/ISchedule'
import { IDisachargeTablesModel } from '~/models/dischage-tables/IDisachargeTablesModel'
import { IInvoicesModel } from '~/models/invoices/IInvoicesModel'
import { ISchedulesModel } from '~/models/schedules/ISchedulesModel'
import {
  calculateInvoiceDischarge,
  ICalculateData
} from '~/utilities/calculate-invoice-discharge'

import {
  IInvoiceReceipt,
  IReceiveSchedulesDTO,
  IReceiveInvoiceDTO
} from './dto'

export function createReceiveSchedulesModule(
  schedulesModel: ISchedulesModel,
  invoicesModel: IInvoicesModel,
  dischargeTablesModel: IDisachargeTablesModel
) {
  function generateReceipts(
    data: Omit<ICalculateData, 'invoice'>,
    receiptPerInvoice: boolean,
    invoices: IInvoice[],
    invoiceReceipts: IReceiveInvoiceDTO[],
    totalReceiptValue: number
  ): IInvoiceReceipt[] {
    let receipts: IInvoiceReceipt[] = []
    let totalDischargeValue = 0.0

    receipts = invoices.map<IInvoiceReceipt>(invoice => {
      const receipt = invoiceReceipts.find(curr => curr.id === invoice.id)

      const dischargeValue = calculateInvoiceDischarge({ ...data, invoice })

      totalDischargeValue +=
        invoice.divergence === 'NOT_RECEIVED' ? 0 : dischargeValue

      return {
        invoice,
        dischargeValue,
        receiptValue: receipt?.receiptValue || 0
      }
    })

    if (!receiptPerInvoice) {
      const extraValue = totalReceiptValue - totalDischargeValue

      if (extraValue >= 0) {
        const receiptCount = receipts.length

        receipts = receipts.map(receipt => ({
          ...receipt,
          receiptValue: receipt.dischargeValue + extraValue / receiptCount || 0
        }))
      } else {
        receipts = receipts.map(receipt => ({
          ...receipt,
          receiptValue: receipt.dischargeValue || 0
        }))
      }
    }

    return receipts
  }

  return {
    async execute(scheduleId: string, data: IReceiveSchedulesDTO) {
      const schedule = await schedulesModel.findById(scheduleId)

      if (!schedule) {
        throw new createHttpError.NotFound('Agendamento não existe')
      }

      if (!schedule.closedAt) {
        throw new createHttpError.BadRequest(
          'Agendamento ainda não foi fechado'
        )
      }

      if (schedule.receivedAt) {
        throw new createHttpError.BadRequest(
          'Agendamento já teve os recibos confirmados'
        )
      }

      const invoices = schedule.invoices.filter(({ canceledAt }) => !canceledAt)

      const conflictedInvoiceCount = invoices.filter(
        invoice => !!invoice.divergence
      ).length

      if (conflictedInvoiceCount !== invoices.length) {
        throw new createHttpError.BadRequest(
          'Esse agendamento possui notas não conflitadas'
        )
      }

      const receiptsOfScheduledInvoicesCount = invoices.filter(
        invoice => !!data.invoices.find(curr => curr.id === invoice.id)
      ).length

      if (receiptsOfScheduledInvoicesCount !== invoices.length) {
        throw new createHttpError.BadRequest(
          'Alguma(s) das notas não teve o recibo informado'
        )
      }

      const dischargeTable = await dischargeTablesModel.findLatest()

      if (!dischargeTable) {
        throw new createHttpError.NotFound(
          'Tabela de Descarrego não encontrada'
        )
      }

      if (schedule.dischargeTable.id !== dischargeTable.id) {
        throw new createHttpError.BadRequest(
          'A tabela de descarga foi atualizada, atualize os agendamentos para obter os valores atuais'
        )
      }

      const { receiptPerInvoice } = data

      const receipts: IInvoiceReceipt[] = generateReceipts(
        { ...data, dischargeTable },
        receiptPerInvoice,
        invoices,
        data.invoices,
        data.receiptValue
      )

      const totalReceiptValue = receiptPerInvoice
        ? receipts.reduce(
            (curr, { receiptValue }) => curr + (receiptValue || 0),
            0
          )
        : data.receiptValue || 0

      const totalDischargeValue = receipts.reduce(
        (curr, { dischargeValue }) => curr + dischargeValue,
        0
      )

      for (let i = 0; i < receipts.length; i++) {
        const { invoice, receiptValue, dischargeValue } = receipts[i]

        const receiptedInvoice = createInvoice(
          { ...invoice, receiptValue, dischargeValue },
          invoice.id
        )

        await invoicesModel.update(receiptedInvoice)
      }

      const updateData = createSchedule(
        {
          ...schedule,
          ...pick(
            data,
            'lecturer',
            'driver',
            'vehicleSize',
            'chargeType',
            'pipeSize',
            'paymentMethod',
            'receiptPerInvoice'
          ),
          assistant: data.assistant,
          palletized: data.palletized,
          dischargeValue: totalDischargeValue,
          receiptValue: totalReceiptValue,
          receivedAt: new Date()
        },
        schedule.id
      )

      await schedulesModel.update(updateData)

      const conflictedSchedule = await schedulesModel.findById(scheduleId)

      return conflictedSchedule
    }
  }
}
