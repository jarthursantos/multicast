import { format } from 'date-fns'
import { File } from 'entities/File'
import { generateReport } from 'libs/generate-report'
import {
  ICostPerPeriodData,
  ICostPerPeriodProvider
} from 'providers/ICostPerPeriodProvider'
import { IFilesRepository } from 'repositories/IFilesRepository'

export class HBSCostPerPeriodProvider implements ICostPerPeriodProvider {
  constructor(private fileRepository: IFilesRepository) {}

  async generate(data: ICostPerPeriodData): Promise<File> {
    const dischargeAmount = data.dischargeAmount.toFixed(2).replace('.', ',')
    const receiptAmount = data.receiptAmount.toFixed(2).replace('.', ',')

    const filename = await generateReport('costs', 'schedule-report', {
      ...data,
      reportName: 'Relatório de Recebimento de Mercadorias',
      periodStart: format(data.periodStart, 'dd/MM/yyyy'),
      periodEnd: format(data.periodEnd, 'dd/MM/yyyy'),
      dischargeAmount,
      receiptAmount,
      schedules: data.schedules.map(schedule => {
        const dischargeValue = schedule.dischargeValue
          .toFixed(2)
          .replace('.', ',')
        const receiptValue = schedule.receiptValue.toFixed(2).replace('.', ',')

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

    const file = new File({ filename, originalname: filename })

    await this.fileRepository.save(file)

    return file
  }
}
