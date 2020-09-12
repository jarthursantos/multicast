import { Invoice } from 'entities/Invoice'
import { Schedule } from 'entities/Schedule'
import { pick } from 'lodash'
import { IDischargeTablesRepository } from 'repositories/IDischargeTablesRepository'
import { IInvoicesRepository } from 'repositories/IInvoicesRepository'
import { ISchedulesRepository } from 'repositories/ISchedulesRepository'
import {
  calculateInvoiceDischarge,
  CalculateData
} from 'utils/calculate-invoice-discharge'

import {
  ReceiveSchedulesRequestDTO,
  ReceiveInvoiceDTO,
  InvoiceReceipt
} from './ReceiveSchedulesDTO'

export class ReceiveSchedulesUseCase {
  constructor(
    private schedulesRepository: ISchedulesRepository,
    private dischargeTablesRepository: IDischargeTablesRepository,
    private invoicesRepository: IInvoicesRepository
  ) {}

  async execute(scheduleId: string, data: ReceiveSchedulesRequestDTO) {
    const schedule = await this.schedulesRepository.findById(scheduleId)

    if (!schedule) {
      throw new Error('Agendamento não existe')
    }

    if (!schedule.closedAt) {
      throw new Error('Agendamento ainda não foi fechado')
    }

    if (schedule.receivedAt) {
      throw new Error('Agendamento já teve os recibos confirmados')
    }

    const conflictedInvoiceCount = schedule.invoices.filter(
      invoice => !!invoice.divergence
    ).length

    if (conflictedInvoiceCount !== schedule.invoices.length) {
      throw Error('Esse agendamento possui notas não conflitadas')
    }

    const receiptsOfScheduledInvoicesCount = schedule.invoices.filter(
      invoice => !!data.invoices.find(curr => curr.id === invoice.id)
    ).length

    if (receiptsOfScheduledInvoicesCount !== schedule.invoices.length) {
      throw Error('Alguma(s) das notas não teve o recibo informado')
    }

    const dischargeTable = await this.dischargeTablesRepository.findLatest()

    if (schedule.dischargeTable.id !== dischargeTable.id) {
      throw new Error(
        'A tabela de descarga foi atualizada, atualize os agendamentos para obter os valores atuais'
      )
    }

    const { receiptPerInvoice } = data

    const receipts: InvoiceReceipt[] = this.generateReceipts(
      { ...data, dischargeTable },
      receiptPerInvoice,
      schedule.invoices,
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

      const receiptedInvoice = new Invoice(
        { ...invoice, receiptValue, dischargeValue },
        invoice.id
      )

      await this.invoicesRepository.update(receiptedInvoice)
    }

    const updateData = new Schedule(
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
        assistant: data.assistant === 'YES',
        palletized: data.palletized === 'YES',
        dischargeValue: totalDischargeValue,
        receiptValue: totalReceiptValue,
        receivedAt: new Date()
      },
      schedule.id
    )

    await this.schedulesRepository.update(updateData)

    const conflictedSchedule = await this.schedulesRepository.findById(
      scheduleId
    )

    return conflictedSchedule
  }

  private generateReceipts(
    data: Omit<CalculateData, 'invoice'>,
    receiptPerInvoice: boolean,
    invoices: Invoice[],
    invoiceReceipts: ReceiveInvoiceDTO[],
    totalReceiptValue: number
  ): InvoiceReceipt[] {
    let receipts: InvoiceReceipt[] = []
    let totalDischargeValue = 0.0

    receipts = invoices.map<InvoiceReceipt>(invoice => {
      const receipt = invoiceReceipts.find(curr => curr.id === invoice.id)

      const dischargeValue = calculateInvoiceDischarge({ ...data, invoice })

      totalDischargeValue +=
        invoice.divergence === 'NOT_RECEIVED' ? 0 : dischargeValue

      return {
        invoice,
        dischargeValue,
        receiptValue: receipt.receiptValue || 0
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
}
