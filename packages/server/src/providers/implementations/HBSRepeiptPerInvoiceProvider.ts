import puppeteerOptions from 'configs/puppeteer'
import { format } from 'date-fns'
import { File } from 'entities/File'
import exphbs from 'express-handlebars'
import { resolve, join } from 'path'
import {
  IReceiptPerInvoiceData,
  IRepceiptPerInvoiceProvider
} from 'providers/IReceiptPerInvoiceProvider'
import puppeteer from 'puppeteer'
import { IFilesRepository } from 'repositories/IFilesRepository'
import { v4 as uuid } from 'uuid'

export class HBSRepeiptPerInvoiceProvider
  implements IRepceiptPerInvoiceProvider {
  constructor(private fileRepository: IFilesRepository) {}

  async generate(data: IReceiptPerInvoiceData): Promise<File> {
    const viewsPath = resolve(__dirname, '..', '..', 'views', 'reports')
    const templatePath = join(viewsPath, 'receipt-per-invoice.hbs')
    const outputDit = resolve(__dirname, '..', '..', '..', 'tmp', 'uploads')

    const engine = exphbs.create({
      layoutsDir: resolve(viewsPath, 'layouts'),
      partialsDir: resolve(viewsPath, 'partials'),
      defaultLayout: 'receipt',
      extname: 'hbs'
    })

    const generate = () => {
      return new Promise<string>((resolve, reject) => {
        engine.renderView(
          templatePath,
          {
            ...data,
            providerName: data.name,
            emittedAt: format(new Date(), 'dd/MM/yyyy')
          },
          (err, body) => {
            if (err) {
              return reject(err)
            }

            return resolve(body)
          }
        )
      })
    }

    const html = await generate()

    const browser = await puppeteer.launch({
      args: ['--no-sandbox'],
      headless: true
    })

    const filename = `${uuid()}.pdf`

    const page = await browser.newPage()
    await page.setContent(html)
    await page.pdf({ ...puppeteerOptions, path: join(outputDit, filename) })

    await browser.close()

    const file = new File({ filename, originalname: filename })

    await this.fileRepository.save(file)

    return file
  }
}
