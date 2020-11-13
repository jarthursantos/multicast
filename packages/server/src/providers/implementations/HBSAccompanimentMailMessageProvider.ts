import { format } from 'date-fns'
import { Accompaniment } from 'entities/Accompaniment'
import { File } from 'entities/File'
import { AccompanimentMailData } from 'entities/MailData'
import exphbs from 'express-handlebars'
import { resolve, join } from 'path'
import { IAccompanimentMailMessageProvider } from 'providers/IAccompanimentMailMessageProvider'
import { IAccompanimentReportProvider } from 'providers/IAccompanimentReportProvider'

export class HBSAccompanimentMailMessageProvider
  implements IAccompanimentMailMessageProvider {
  constructor(
    private accompanimentReportProvider: IAccompanimentReportProvider
  ) {}

  async generate(accompaniment: Accompaniment): Promise<AccompanimentMailData> {
    const { purchaseOrder, releasedAt } = accompaniment
    const { provider } = purchaseOrder

    const mail: AccompanimentMailData = {
      to: provider.representative.email,
      subject: `PEDIDO [${purchaseOrder.number}] - ${provider.name} (${provider.fantasy})`,
      body: ''
    }

    let file: File

    if (accompaniment.expectedBillingAt) {
      file = await this.accompanimentReportProvider.generate(accompaniment)

      return { ...mail, file }
    }

    let reportName: string

    if (!accompaniment.sendedAt) {
      reportName = 'non-sended'

      mail.subject = `ENVIO - ${mail.subject}`

      file = await this.accompanimentReportProvider.generate(accompaniment)
    } else if (!accompaniment.reviewedAt || !accompaniment.releasedAt) {
      reportName = 'non-revised'

      mail.subject = `REVISÃO/LIBERAÇÃO - ${mail.subject}`

      file = await this.accompanimentReportProvider.generate(accompaniment, {
        only: 'pending'
      })
    } else if (!accompaniment.expectedBillingAt) {
      reportName = 'non-released'

      mail.subject = `A FATURAR - ${mail.subject}`

      file = await this.accompanimentReportProvider.generate(accompaniment, {
        only: 'pending'
      })
    }

    const viewsPath = resolve(__dirname, '..', '..', 'views', 'emails')
    const templatePath = join(viewsPath, `${reportName}.hbs`)

    const engine = exphbs.create({
      layoutsDir: resolve(viewsPath, 'layouts'),
      partialsDir: resolve(viewsPath, 'partials'),
      defaultLayout: 'accompaniment',
      extname: 'hbs'
    })

    const body = await new Promise<string>((resolve, reject) => {
      engine.renderView(
        templatePath,
        {
          number: purchaseOrder.number,
          name: provider.name,
          fantasy: provider.fantasy,
          ...(releasedAt
            ? { releasedAt: format(releasedAt, 'dd/MM/yyyy') }
            : {})
        },
        (err, body) => {
          if (err) {
            return reject(err)
          }

          return resolve(body)
        }
      )
    })

    return {
      ...mail,
      file,
      body
    }
  }
}
