import { format } from 'date-fns'
import extense from 'extenso'

import { createFile, IFile } from '~/domain/IFile'
import { generateReport } from '~/libraries/Report'
import { IFilesModel } from '~/models/files/IFilesModel'

import {
  IScheduleInvoiceReceiptData,
  IScheduleInvoiceReceiptProvider
} from './IScheduleInvoiceReceiptProvider'

export function createHBSScheduleInvoiceReceiptProvider(
  filesModel: IFilesModel
): IScheduleInvoiceReceiptProvider {
  return {
    async generate(data: IScheduleInvoiceReceiptData): Promise<IFile> {
      const receiptValue = (data.receiptValue || 0).toFixed(2).replace('.', ',')
      const receiptValueExtense = extense(receiptValue, { mode: 'currency' })

      const filename = await generateReport(
        'reports',
        'receipt-per-invoice',
        'receipt',
        {
          ...data,
          receiptValue,
          receiptValueExtense,
          providerName: data.name,
          emittedAt: format(new Date(), 'dd/MM/yyyy')
        }
      )

      const file = createFile({ filename, originalname: filename })

      await filesModel.save(file)

      return file
    }
  }
}
