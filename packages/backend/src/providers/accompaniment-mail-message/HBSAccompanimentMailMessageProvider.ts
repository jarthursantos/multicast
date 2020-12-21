import createHttpError from 'http-errors'

import { IAccompaniment } from '~/domain/IAccompaniment'
import { IFile } from '~/domain/IFile'
import { IAccompanimentMailData } from '~/domain/IMailData'
import { generateHTML } from '~/libraries/Report'
import { formatDate } from '~/utilities/date'

import { IAccompanimentReportProvider } from '../accompaniment-report/IAccompanimentReportProvider'
import { IAccompanimentMailMessageProvider } from './IAccompanimentMailMessageProvider'

export function createHBSAccompanimentMailMessageProvider(
  accompanimentReportProvider: IAccompanimentReportProvider
): IAccompanimentMailMessageProvider {
  return {
    async generate(
      accompaniment: IAccompaniment
    ): Promise<IAccompanimentMailData> {
      const { purchaseOrder, releasedAt } = accompaniment
      const { provider } = purchaseOrder

      const mail: IAccompanimentMailData = {
        to: provider.representative.email,
        subject: `PEDIDO [${purchaseOrder.number}] - ${provider.name} (${provider.fantasy})`,
        body: ''
      }

      let file: IFile | undefined

      if (accompaniment.expectedBillingAt) {
        file = await accompanimentReportProvider.generate(accompaniment)

        return { ...mail, file }
      }

      let reportName = 'default'

      if (!accompaniment.sendedAt) {
        reportName = 'non-sended'

        mail.subject = `ENVIO - ${mail.subject}`

        file = await accompanimentReportProvider.generate(accompaniment)
      } else if (!accompaniment.reviewedAt || !accompaniment.releasedAt) {
        reportName = 'non-revised'

        mail.subject = `REVISÃO/LIBERAÇÃO - ${mail.subject}`

        file = await accompanimentReportProvider.generate(accompaniment, {
          only: 'pending'
        })
      } else if (!accompaniment.expectedBillingAt) {
        reportName = 'non-released'

        mail.subject = `A FATURAR - ${mail.subject}`

        file = await accompanimentReportProvider.generate(accompaniment, {
          only: 'pending'
        })
      }

      if (!file) {
        throw new createHttpError.InternalServerError(
          'Não foi possível gerar o relatório'
        )
      }

      const body = await generateHTML(reportName, 'accompaniment', {
        number: purchaseOrder.number,
        name: provider.name,
        fantasy: provider.fantasy,
        ...(releasedAt ? { releasedAt: formatDate(releasedAt) } : {})
      })

      return {
        ...mail,
        file,
        body
      }
    }
  }
}
