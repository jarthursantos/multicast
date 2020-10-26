import { format } from 'date-fns'
import { Accompaniment } from 'entities/Accompaniment'
import { MailData } from 'entities/MailData'
import exphbs from 'express-handlebars'
import { resolve, join } from 'path'
import { IAccompanimentMailMessageProvider } from 'providers/IAccompanimentMailMessageProvider'

export class HBSAccompanimentMailMessageProvider
  implements IAccompanimentMailMessageProvider {
  async generate(accompaniment: Accompaniment): Promise<MailData> {
    const { purchaseOrder, releasedAt } = accompaniment
    const { provider } = purchaseOrder

    const mail: MailData = {
      to: provider.representative.email,
      subject: `Pedido [${purchaseOrder.number}] - ${provider.name} (${provider.fantasy})`,
      body: ''
    }

    if (accompaniment.expectedBillingAt) {
      return mail
    }

    let reportName: string

    if (!accompaniment.sendedAt) {
      reportName = 'non-sended'

      mail.subject = `ENVIO - ${mail.subject}`
    } else if (!accompaniment.reviewedAt || !accompaniment.releasedAt) {
      reportName = 'non-revised'

      mail.subject = `REVISÃO/LIBERAÇÃO - ${mail.subject}`
    } else if (!accompaniment.expectedBillingAt) {
      reportName = 'non-released'

      mail.subject = `A FATURAR - ${mail.subject}`
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
      body
    }
  }
}
