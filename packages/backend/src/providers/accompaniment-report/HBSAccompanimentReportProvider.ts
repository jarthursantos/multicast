import { IAccompaniment } from '~/domain/IAccompaniment'
import { createFile, IFile } from '~/domain/IFile'
import { generateReport } from '~/libraries/Report'
import { IAccompanimentProductsModel } from '~/models/accompaniment-products/IAccompanimentProductsModel'
import { IOptions } from '~/models/accompaniment-products/IAccompanimentProductsModel'
import { IAccompanimentReportDeadlineModel } from '~/models/accompaniment-report-deadline/IAccompanimentReportDeadlineModel'
import { IAccompanimentReportHeaderModel } from '~/models/accompaniment-report-header/IAccompanimentReportHeaderModel'
import { IFilesModel } from '~/models/files/IFilesModel'
import { formatDate } from '~/utilities/date'
import { normalizeDate } from '~/utilities/normalizations'

import { IAccompanimentReportProvider } from './IAccompanimentReportProvider'

export function createHBSAccompanimentReportProvider(
  accompanimentReportHeaderModel: IAccompanimentReportHeaderModel,
  accompanimentProductsModel: IAccompanimentProductsModel,
  accompanimentReportDeadlineModel: IAccompanimentReportDeadlineModel,
  filesModel: IFilesModel
): IAccompanimentReportProvider {
  return {
    async generate(
      accompaniment: IAccompaniment,
      options?: IOptions
    ): Promise<IFile> {
      const header = await accompanimentReportHeaderModel.find(accompaniment)

      const deadline = await accompanimentReportDeadlineModel.generate(
        accompaniment
      )

      const {
        emittedAt,
        billingAt,
        boardingAt,
        expectedDeliveryAt: deliveryAt
      } = header

      const products = await accompanimentProductsModel.find(
        accompaniment,
        options
      )

      const amountICMSBase = products
        .reduce(
          (curr, { icmsBase, requestedQuantity }) =>
            curr + (icmsBase || 0) * requestedQuantity,
          0
        )
        .toFixed(2)
        .replace('.', ',')

      const amountICMSValue = products
        .reduce(
          (curr, { icmsValue, requestedQuantity }) =>
            curr + (icmsValue || 0) * requestedQuantity,
          0
        )
        .toFixed(2)
        .replace('.', ',')

      const amountVolume = products
        .reduce(
          (curr, { volume, requestedQuantity }) =>
            curr + (volume || 0) * requestedQuantity,
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

      const filename = await generateReport(
        'reports',
        'accompaniment',
        'accompaniment',
        {
          ...header,
          freight: header.freight === 'C' ? 'CIF' : 'FOB',
          emittedAt: formatDate(normalizeDate(emittedAt)),
          billingAt: formatDate(normalizeDate(billingAt)),
          boardingAt: formatDate(normalizeDate(boardingAt)),
          expectedDeliveryAt: formatDate(normalizeDate(deliveryAt)),
          amountICMSBase,
          amountICMSValue,
          amountVolume,
          totalAmountValue,
          deadline,
          productCount: products.length,
          products: products.map(product => ({
            ...product,
            ipi: product.ipi?.toFixed(2).replace('.', ','),
            price: product.price.toFixed(2).replace('.', ','),
            amountValue: (product.price * product.requestedQuantity)
              .toFixed(2)
              .replace('.', ',')
          }))
        }
      )

      const file = createFile({ filename, originalname: filename })

      await filesModel.save(file)

      return file
    }
  }
}
