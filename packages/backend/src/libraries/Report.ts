import exphbs from 'express-handlebars'
import { resolve, join } from 'path'
import puppeteer from 'puppeteer'
import { v4 as uuid } from 'uuid'

import puppeteerOptions from '~/configs/puppeteer'

export async function generateHTML(
  template: string,
  layout: string,
  data: any
) {
  const normalizedTemplate = template.endsWith('.hbs')
    ? template
    : `${template}.hbs`

  const viewsPath = resolve(__dirname, '..', 'app', 'views', 'reports')
  const templatePath = join(viewsPath, normalizedTemplate)

  const engine = exphbs.create({
    layoutsDir: resolve(viewsPath, 'layouts'),
    partialsDir: resolve(viewsPath, 'partials'),
    defaultLayout: layout,
    extname: 'hbs'
  })

  return new Promise<string>((resolve, reject) => {
    engine.renderView(templatePath, data, (err, body) => {
      if (err) {
        return reject(err)
      }

      if (!body) {
        return reject(new Error('Não foi possível gerar o relatório'))
      }

      return resolve(body)
    })
  })
}

export async function generateReport(
  template: string,
  layout: string,
  data: any
) {
  const html = await generateHTML(template, layout, data)

  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    headless: true
  })

  const filename = `${uuid()}.pdf`
  const outputDit = resolve(__dirname, '..', '..', 'tmp', 'uploads')

  const page = await browser.newPage()

  await page.setContent(html)
  await page.pdf({ ...puppeteerOptions, path: join(outputDit, filename) })
  await page.close()

  await browser.close()

  return filename
}
