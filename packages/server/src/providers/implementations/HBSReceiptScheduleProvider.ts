import puppeteerOptions from 'configs/puppeteer'
import { format } from 'date-fns'
import { File } from 'entities/File'
import exphbs from 'express-handlebars'
import extense from 'extenso'
import { resolve, join } from 'path'
import {
  IReceiptScheduleData,
  IReceiptScheduleProvider
} from 'providers/IReceiptScheduleProvider'
import puppeteer from 'puppeteer'
import { IFilesRepository } from 'repositories/IFilesRepository'
import { v4 as uuid } from 'uuid'

export class HBSReceiptScheduleProvider implements IReceiptScheduleProvider {
  constructor(private fileRepository: IFilesRepository) {}

  async generate(data: IReceiptScheduleData): Promise<File> {
    const viewsPath = resolve(__dirname, '..', '..', 'views', 'reports')
    const templatePath = join(viewsPath, 'receipt.hbs')
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
            receiptValue: data.receiptValue.toFixed(2).replace('.', ','),
            receiptValueExtense: extense(
              data.receiptValue.toFixed(2).replace('.', ','),
              {
                mode: 'currency'
              }
            ),
            emittedAt: format(new Date(), 'dd/MM/yyyy'),
            invoices: data.invoices.map(invoice => {
              console.log({ invoice })

              return {
                ...invoice,
                receiptValue: invoice.receiptValue.toFixed(2).replace('.', ','),
                receiptValueExtense: extense(
                  invoice.receiptValue.toFixed(2).replace('.', ','),
                  {
                    mode: 'currency',
                    number: {
                      decimal: 'formal'
                    }
                  }
                )
              }
            })
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
