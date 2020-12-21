import { format } from 'date-fns'

import { createFile, IFile } from '~/domain/IFile'
import { generateReport } from '~/libraries/Report'
import { IFilesModel } from '~/models/files/IFilesModel'
import { normalizeDate } from '~/utilities/normalizations'

import {
  ICostsPerPeriodProvider,
  ICostPerPeriodData
} from './ICostsPerPeriodProvider'

export function createHBSCostsPerPeriodProvider(
  filesModel: IFilesModel
): ICostsPerPeriodProvider {
  return {
    async generate(data: ICostPerPeriodData): Promise<IFile> {
      const dischargeAmount = data.dischargeAmount.toFixed(2).replace('.', ',')
      const receiptAmount = data.receiptAmount.toFixed(2).replace('.', ',')

      const filename = await generateReport('costs', 'schedule-report', {
        ...data,
        reportName: 'Relatório de Recebimento de Mercadorias',
        periodStart: format(normalizeDate(data.periodStart), 'dd/MM/yyyy'),
        periodEnd: format(normalizeDate(data.periodEnd), 'dd/MM/yyyy'),
        dischargeAmount,
        receiptAmount,
        schedules: data.schedules.map(schedule => {
          const dischargeValue = schedule.dischargeValue
            .toFixed(2)
            .replace('.', ',')
          const receiptValue = schedule.receiptValue
            .toFixed(2)
            .replace('.', ',')

          let paymentMethod = '-'

          switch (schedule.paymentMethod) {
            case 'PENDING':
              paymentMethod = 'PENDENTE'
              break
            case 'MONEY':
              paymentMethod = 'DINHEIRO'
              break
            case 'DEPOSIT':
              paymentMethod = 'DEPÓSITO'
              break
          }

          return {
            ...schedule,
            dischargeValue,
            receiptValue,
            paymentMethod
          }
        })
      })

      const file = createFile({ filename, originalname: filename })

      await filesModel.save(file)

      return file
    }
  }
}
