import { format } from 'date-fns'
import extense from 'extenso'

import { createFile, IFile } from '~/domain/IFile'
import { generateReport } from '~/libraries/Report'
import { IFilesModel } from '~/models/files/IFilesModel'

import {
  IScheduleReceiptData,
  IScheduleReceiptProvider
} from './IScheduleReceiptProvider'

export function createHBSScheduleReceiptProvider(
  filesModel: IFilesModel
): IScheduleReceiptProvider {
  return {
    async generate(data: IScheduleReceiptData): Promise<IFile> {
      const filename = await generateReport('receipt', 'receipt', {
        ...data,
        receiptValue: (data.receiptValue || 0).toFixed(2).replace('.', ','),
        receiptValueExtense: extense(
          (data.receiptValue || 0).toFixed(2).replace('.', ','),
          {
            mode: 'currency'
          }
        ),
        emittedAt: format(new Date(), 'dd/MM/yyyy'),
        invoices: data.invoices.map(invoice => {
          return {
            ...invoice,
            receiptValue: (invoice.receiptValue || 0)
              .toFixed(2)
              .replace('.', ','),
            receiptValueExtense: extense(
              (invoice.receiptValue || 0).toFixed(2).replace('.', ','),
              {
                mode: 'currency',
                number: {
                  decimal: 'formal'
                }
              }
            )
          }
        })
      })

      const file = createFile({ filename, originalname: filename })

      await filesModel.save(file)

      return file
    }
  }
}
