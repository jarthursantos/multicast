import { format } from 'date-fns'
import { Accompaniment } from 'entities/Accompaniment'
import { File } from 'entities/File'
import { generateReport } from 'libs/generate-report'
import { IAccompanimentProductsRepository } from 'repositories/IAccompanimentProductsRepository'
import { Options } from 'repositories/IAccompanimentProductsRepository'
import { IAccompanimentReportDeadlineRepository } from 'repositories/IAccompanimentReportDeadlineRepository'
import { IAccompanimentReportHeaderRepository } from 'repositories/IAccompanimentReportHeaderRepository'
import { IFilesRepository } from 'repositories/IFilesRepository'
import { normalizeDate } from 'utils/date-intervals'

import { IAccompanimentReportProvider } from '../IAccompanimentReportProvider'

export class HBSAccompanimentReportProvider
  implements IAccompanimentReportProvider {
  constructor(
    private accompanimentReportHeaderRepository: IAccompanimentReportHeaderRepository,
    private accompanimentProductsRepository: IAccompanimentProductsRepository,
    private accompanimentReportDeadlineRepository: IAccompanimentReportDeadlineRepository,
    private fileRepository: IFilesRepository
  ) {}

  async generate(
    accompaniment: Accompaniment,
    options?: Options
  ): Promise<File> {
    const header = await this.accompanimentReportHeaderRepository.find(
      accompaniment
    )

    const deadline = await this.accompanimentReportDeadlineRepository.generate(
      accompaniment
    )

    const {
      emittedAt,
      billingAt,
      boardingAt,
      expectedDeliveryAt: deliveryAt
    } = header

    const products = await this.accompanimentProductsRepository.find(
      accompaniment,
      options
    )

    const amountICMSBase = products
      .reduce(
        (curr, { icmsBase, requestedQuantity }) =>
          curr + icmsBase * requestedQuantity,
        0
      )
      .toFixed(2)
      .replace('.', ',')

    const amountICMSValue = products
      .reduce(
        (curr, { icmsValue, requestedQuantity }) =>
          curr + icmsValue * requestedQuantity,
        0
      )
      .toFixed(2)
      .replace('.', ',')

    const amountVolume = products
      .reduce(
        (curr, { volume, requestedQuantity }) =>
          curr + volume * requestedQuantity,
        0
      )
      .toFixed(2)
      .replace('.', ',')

    const totalAmountValue = products
      .reduce(
        (curr, { price, requestedQuantity }) =>
          curr + price * requestedQuantity,
        0
      )
      .toFixed(2)
      .replace('.', ',')

    const filename = await generateReport('accompaniment', 'accompaniment', {
      ...header,
      freight: header.freight === 'C' ? 'CIF' : 'FOB',
      emittedAt: format(normalizeDate(emittedAt), 'dd/MM/yyyy'),
      billingAt: format(normalizeDate(billingAt), 'dd/MM/yyyy'),
      boardingAt: format(normalizeDate(boardingAt), 'dd/MM/yyyy'),
      expectedDeliveryAt: format(normalizeDate(deliveryAt), 'dd/MM/yyyy'),
      amountICMSBase,
      amountICMSValue,
      amountVolume,
      totalAmountValue,
      deadline,
      productCount: products.length,
      products: products.map(product => ({
        ...product,
        ipi: product.ipi.toFixed(2).replace('.', ','),
        price: product.price.toFixed(2).replace('.', ','),
        amountValue: (product.price * product.requestedQuantity)
          .toFixed(2)
          .replace('.', ',')
      }))
    })

    const file = new File({ filename, originalname: filename })

    await this.fileRepository.save(file)

    return file
  }
}
