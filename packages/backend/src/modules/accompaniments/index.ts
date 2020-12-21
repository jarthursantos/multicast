import { createWinThorAccompanimentProductsModel } from '~/models/accompaniment-products/WinThorAccompanimentProductsModel'
import { createWinThorAccompanimentReportDeadlineModel } from '~/models/accompaniment-report-deadline/WinThorAccompanimentReportDeadlineModel'
import { createWinThorAccompanimentReportHeaderModel } from '~/models/accompaniment-report-header/WinThorAccompanimentReportHeaderModel'
import { createPrismaAccompanimentsModel } from '~/models/accompaniments/PrismaAccompanimentsModel'
import { createPrismaAnnotationsModel } from '~/models/annotations/PrismaAnnotationsModel'
import { createPrismaFilesModel } from '~/models/files/PrismaFilesModel'
import { createWinThorInvoiceSituationsModel } from '~/models/invoice-situations/WinThorInvoiceSituationsModel'
import { createWinThorInvoicesWithoutAccompanimentsModel } from '~/models/invoices-without-accompaniments/WinThorInvoicesWithoutAccompanimentsModel'
import { createPrismaInvoicesModel } from '~/models/invoices/PrismaInvoicesModel'
import { createWinThorProvidersModel } from '~/models/providers/WinThorProvidersModel'
import { createWinThorPurchaseOrdersModel } from '~/models/purchase-orders/WinThorPurchaseOrdersModel'
import { createPrismaRenewAccompanimentsModel } from '~/models/renew-accompaniments/PrismaRenewAccompanimentsModel'
import { createPrismaUsersModel } from '~/models/users/PrismaUsersModel'
import { createManualAccompanimentDelayProvider } from '~/providers/accompaniment-delay/ManualAccompanimentDelayProvider'
import { createHBSAccompanimentMailMessageProvider } from '~/providers/accompaniment-mail-message/HBSAccompanimentMailMessageProvider'
import { createHBSAccompanimentReportProvider } from '~/providers/accompaniment-report/HBSAccompanimentReportProvider'
import { createPrismaLastPurchaseOrderProvider } from '~/providers/last-purchase-order/PrismaLastPurchaseOrderProvider'

import { createCreateAccompanimentAnnotationsModule } from './annotations'
import { createCancelAccompanimentsModule } from './cancel'
import { cancelAccompanimentsSchema } from './cancel/schema'
import { createFindAllAccompanimentsModule } from './find-all'
import { createFindAccompanimentByIdModule } from './find-by-id'
import { createFindAccompanimentsProductsModule } from './find-products'
import { createGenerateAccompanimentsPDFModule } from './generate-pdf'
import { crateMarkAccompanimentAsReviewedModule } from './mark-as-released'
import { crateMarkAccompanimentAsReleasedModule } from './mark-as-reviewed'
import { crateMarkAccompanimentAsSendedModule } from './mark-as-sended'
import { createRenewAccompanimentsModule } from './renew'
import { createFindAccompanimentUntrackedInvoices } from './untracked-invoices'
import { createUpdateAccompanimentsModule } from './update'
import { updateAccompanimentsSchema } from './update/schema'

const lastPurchaseOrderProvider = createPrismaLastPurchaseOrderProvider()
const usersModel = createPrismaUsersModel()
const annotationsModel = createPrismaAnnotationsModel(usersModel)
const providersModel = createWinThorProvidersModel()
const invoiceSituationsModel = createWinThorInvoiceSituationsModel()
const accompanimentDelayProvider = createManualAccompanimentDelayProvider()
const invoicesWithoutAccompanimentsModel = createWinThorInvoicesWithoutAccompanimentsModel()
const accompanimentProductsModel = createWinThorAccompanimentProductsModel()
const purchaseOrdersModel = createWinThorPurchaseOrdersModel(
  lastPurchaseOrderProvider
)
const invoicesModel = createPrismaInvoicesModel(
  providersModel,
  invoiceSituationsModel
)
const accompanimentsModel = createPrismaAccompanimentsModel(
  purchaseOrdersModel,
  annotationsModel,
  invoicesModel,
  invoicesWithoutAccompanimentsModel,
  accompanimentDelayProvider
)
const accompanimentReportHeaderModel = createWinThorAccompanimentReportHeaderModel()
const accompanimentReportDeadlineModel = createWinThorAccompanimentReportDeadlineModel()
const filesModel = createPrismaFilesModel()
const hbsAccompanimentReportProvider = createHBSAccompanimentReportProvider(
  accompanimentReportHeaderModel,
  accompanimentProductsModel,
  accompanimentReportDeadlineModel,
  filesModel
)
const hbsAccompanimentMailMessageProvider = createHBSAccompanimentMailMessageProvider(
  hbsAccompanimentReportProvider
)
const renewAccompanimentsModel = createPrismaRenewAccompanimentsModel(
  accompanimentsModel
)

const findAllAccompanimentsModule = createFindAllAccompanimentsModule(
  accompanimentsModel,
  purchaseOrdersModel
)
const findAccompanimentByIdModule = createFindAccompanimentByIdModule(
  accompanimentsModel
)
const findAccompanimentsProductsModule = createFindAccompanimentsProductsModule(
  accompanimentsModel,
  accompanimentProductsModel
)
const markAccompanimentAsSendedModule = crateMarkAccompanimentAsSendedModule(
  accompanimentsModel
)
const markAccompanimentAsReleasedModule = crateMarkAccompanimentAsReleasedModule(
  accompanimentsModel
)
const markAccompanimentAsReviewedModule = crateMarkAccompanimentAsReviewedModule(
  accompanimentsModel
)
const generateAccompanimentsPDFModule = createGenerateAccompanimentsPDFModule(
  accompanimentsModel,
  hbsAccompanimentMailMessageProvider
)
const findAccompanimentUntrackedInvoices = createFindAccompanimentUntrackedInvoices(
  accompanimentsModel,
  invoicesWithoutAccompanimentsModel
)
const createAccompanimentAnnotationsModule = createCreateAccompanimentAnnotationsModule(
  accompanimentsModel,
  annotationsModel
)
const renewAccompanimentsModule = createRenewAccompanimentsModule(
  accompanimentsModel,
  renewAccompanimentsModel
)
const cancelAccompanimentsModule = createCancelAccompanimentsModule(
  accompanimentsModel
)
const updateAccompanimentsModule = createUpdateAccompanimentsModule(
  accompanimentsModel,
  invoicesWithoutAccompanimentsModel
)

export {
  cancelAccompanimentsModule,
  cancelAccompanimentsSchema,
  createAccompanimentAnnotationsModule,
  findAllAccompanimentsModule,
  findAccompanimentByIdModule,
  findAccompanimentsProductsModule,
  findAccompanimentUntrackedInvoices,
  markAccompanimentAsReviewedModule,
  markAccompanimentAsReleasedModule,
  markAccompanimentAsSendedModule,
  generateAccompanimentsPDFModule,
  renewAccompanimentsModule,
  updateAccompanimentsModule,
  updateAccompanimentsSchema
}
