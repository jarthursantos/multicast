import { createWinThorAccompanimentProductsModel } from '~/models/accompaniment-products/WinThorAccompanimentProductsModel'
import { createWinThorAccompanimentReportDeadlineModel } from '~/models/accompaniment-report-deadline/WinThorAccompanimentReportDeadlineModel'
import { createWinThorAccompanimentReportHeaderModel } from '~/models/accompaniment-report-header/WinThorAccompanimentReportHeaderModel'
import { createPrismaAccompanimentScheduleModel } from '~/models/accompaniment-schedule/PrismaAccompanimentScheduleModel'
import { createPrismaAccompanimentsModel } from '~/models/accompaniments/PrismaAccompanimentsModel'
import { createPrismaAnnotationsModel } from '~/models/annotations/PrismaAnnotationsModel'
import { createPrismaFilesModel } from '~/models/files/PrismaFilesModel'
import { createWinThorInvoicesWithoutAccompanimentsModel } from '~/models/invoices-without-accompaniments/WinThorInvoicesWithoutAccompanimentsModel'
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
import { createFindCanceledAccompanimentsModule } from './find-canceleds'
import { createFindAccompanimentsProductsModule } from './find-products'
import { createGenerateAccompanimentsPDFModule } from './generate-pdf'
import { createMarkAccompanimentAsFinishedModule } from './mark-as-finished'
import { createMarkAccompanimentAsReviewedModule } from './mark-as-released'
import { createMarkAccompanimentAsReleasedModule } from './mark-as-reviewed'
import { createMarkAccompanimentAsSendedModule } from './mark-as-sended'
import { createRenewAccompanimentsModule } from './renew'
import { createFindAccompanimentUntrackedInvoices } from './untracked-invoices'
import { createUpdateAccompanimentsModule } from './update'
import { updateAccompanimentsSchema } from './update/schema'

const lastPurchaseOrderProvider = createPrismaLastPurchaseOrderProvider()
const usersModel = createPrismaUsersModel()
const annotationsModel = createPrismaAnnotationsModel(usersModel)
const providersModel = createWinThorProvidersModel()
const accompanimentDelayProvider = createManualAccompanimentDelayProvider()
const invoicesWithoutAccompanimentsModel = createWinThorInvoicesWithoutAccompanimentsModel()
const accompanimentProductsModel = createWinThorAccompanimentProductsModel()
const purchaseOrdersModel = createWinThorPurchaseOrdersModel(
  lastPurchaseOrderProvider
)
const accompanimentScheduleModel = createPrismaAccompanimentScheduleModel(
  providersModel
)
const accompanimentsModel = createPrismaAccompanimentsModel(
  purchaseOrdersModel,
  annotationsModel,
  invoicesWithoutAccompanimentsModel,
  accompanimentDelayProvider,
  accompanimentScheduleModel
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
const findCanceledAccompanimentsModule = createFindCanceledAccompanimentsModule(
  accompanimentsModel
)
const findAccompanimentsProductsModule = createFindAccompanimentsProductsModule(
  accompanimentsModel,
  accompanimentProductsModel
)
const markAccompanimentAsSendedModule = createMarkAccompanimentAsSendedModule(
  accompanimentsModel
)
const markAccompanimentAsReleasedModule = createMarkAccompanimentAsReleasedModule(
  accompanimentsModel
)
const markAccompanimentAsFinishedModule = createMarkAccompanimentAsFinishedModule(
  accompanimentsModel
)
const markAccompanimentAsReviewedModule = createMarkAccompanimentAsReviewedModule(
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
  findCanceledAccompanimentsModule,
  findAccompanimentsProductsModule,
  findAccompanimentUntrackedInvoices,
  markAccompanimentAsFinishedModule,
  markAccompanimentAsReviewedModule,
  markAccompanimentAsReleasedModule,
  markAccompanimentAsSendedModule,
  generateAccompanimentsPDFModule,
  renewAccompanimentsModule,
  updateAccompanimentsModule,
  updateAccompanimentsSchema
}
export * from './find-products/parser'
