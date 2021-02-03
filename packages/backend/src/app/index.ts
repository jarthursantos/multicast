/* eslint-disable camelcase */
import 'express-async-errors'

import cors from 'cors'
import express, { Request, Response, NextFunction } from 'express'
import createHttpError, { isHttpError } from 'http-errors'
import mongoose from 'mongoose'
import logger from 'morgan'
import multer from 'multer'
import path from 'path'

import { auth } from '~/app/middlewares/authentication'
import { accompanimentsRoutes } from '~/app/routes/accompaniments'
import { activityBranchesRoutes } from '~/app/routes/activity-branches'
import { agendaRoutes } from '~/app/routes/agenda'
import { billsToPayRoutes } from '~/app/routes/bills-to-pay'
import { branchesRoutes } from '~/app/routes/branches'
import { brandsRoutes } from '~/app/routes/brands'
import { buyersRoutes } from '~/app/routes/buyers'
import { classesRoutes } from '~/app/routes/classes'
import { clientWebsRoutes } from '~/app/routes/client-webs'
import { clientsRoutes } from '~/app/routes/clients'
import { departmentsRoutes } from '~/app/routes/departments'
import { dischargeTablesRoutes } from '~/app/routes/discharge-tables'
import { distribuitionsRoutes } from '~/app/routes/distribuitions'
import { employeesRoutes } from '~/app/routes/employees'
import { invoicesRouter } from '~/app/routes/invoices'
import { permissionsRoutes } from '~/app/routes/permissions'
import { providersRoutes } from '~/app/routes/providers'
import { regionsRoutes } from '~/app/routes/regions'
import { representativesRoutes } from '~/app/routes/representatives'
import { salesClassesRoutes } from '~/app/routes/sales-classes'
import { scheduleRequestsRoutes } from '~/app/routes/schedule-requests'
import { schedulesRoutes } from '~/app/routes/schedules'
import { sectionsRoutes } from '~/app/routes/sections'
import { sessionsRoutes } from '~/app/routes/sessions'
import { usersRoutes } from '~/app/routes/users'
import { URL } from '~/configs/mongo'
import multerOptions from '~/configs/multer'
import { IPurchaseOrder } from '~/domain/IPurchaseOrder'
import { postgreSQL } from '~/libraries/WinThor'
import { createPrismaAccompanimentScheduleModel } from '~/models/accompaniment-schedule/PrismaAccompanimentScheduleModel'
import { createPrismaAccompanimentsModel } from '~/models/accompaniments/PrismaAccompanimentsModel'
import { createPrismaAnnotationsModel } from '~/models/annotations/PrismaAnnotationsModel'
import { createWinThorInvoicesWithoutAccompanimentsModel } from '~/models/invoices-without-accompaniments/WinThorInvoicesWithoutAccompanimentsModel'
import { createWinThorProvidersModel } from '~/models/providers/WinThorProvidersModel'
import { createWinThorPurchaseOrdersModel } from '~/models/purchase-orders/WinThorPurchaseOrdersModel'
import { createPrismaUsersModel } from '~/models/users/PrismaUsersModel'
import { createManualAccompanimentDelayProvider } from '~/providers/accompaniment-delay/ManualAccompanimentDelayProvider'
import { createPrismaLastPurchaseOrderProvider } from '~/providers/last-purchase-order/PrismaLastPurchaseOrderProvider'

import { handleCreateFiles } from './controllers/files'

interface Data {
  numero_pedido: number

  data_liberacao: Date | undefined

  previsao_faturamento: Date | undefined

  arquivo_xml: Date | undefined

  fob_sp: Date | undefined

  previsao_agendamento: Date | undefined

  numero_nota_fiscal: number | undefined
}

const app = express()

mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })

app.use(express.json())
app.use(cors())
app.use(logger('dev'))

app.post('/', async (_, res) => {
  const accompanimentNumbers: Data[] = await postgreSQL
    .distinct('numero_pedido')
    .select(
      'data_liberacao',
      'previsao_faturamento',
      'arquivo_xml',
      'fob_sp',
      'previsao_agendamento',
      'numero_nota_fiscal',
      'saldo_pendente'
    )
    .from('em_andamento')
    .where({
      cancelado: false,
      saldo_pendente: true,
      data_agendada: null
    })
    .andWhere('numero_pedido', '=', 16240)

  const lastPurchaseOrderProvider = createPrismaLastPurchaseOrderProvider()
  const purchaseOrdersModel = createWinThorPurchaseOrdersModel(
    lastPurchaseOrderProvider
  )
  const usersModel = createPrismaUsersModel()
  const annotationsModel = createPrismaAnnotationsModel(usersModel)
  const invoicesWithoutAccompanimentsModel = createWinThorInvoicesWithoutAccompanimentsModel()
  const accompanimentDelayProvider = createManualAccompanimentDelayProvider()
  const providersModel = createWinThorProvidersModel()
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

  const orders: IPurchaseOrder[] = []

  for (let i = 0; i < accompanimentNumbers.length; i++) {
    const accompaniment = accompanimentNumbers[i]

    const order = await purchaseOrdersModel.findByNumber(
      accompaniment.numero_pedido
    )

    if (order) {
      orders.push(order)
    }
  }

  await accompanimentsModel.registerPurchaseOrders(orders)

  /*
  const accompaniments = await accompanimentsModel.findMany()

  for (let i = 0; i < accompaniments.length; i++) {
    const accompaniment = accompaniments[i]

    const data = accompanimentNumbers.find(({ numero_pedido }) => {
      return numero_pedido === accompaniment.purchaseOrder.number
    })

    if (data) {
      accompaniment.sendedAt = data.data_liberacao
      accompaniment.reviewedAt = data.data_liberacao
      accompaniment.releasedAt = data.data_liberacao
      accompaniment.expectedBillingAt = data.previsao_faturamento
      accompaniment.billingAt = data.arquivo_xml
      accompaniment.freeOnBoardAt = data.fob_sp
      accompaniment.schedulingAt = data.previsao_agendamento

      if (data.numero_nota_fiscal) {
        accompaniment.invoiceNumber = data.numero_nota_fiscal
        accompaniment.invoiceProvider =
          accompaniment.purchaseOrder.provider.code
      }

      await accompanimentsModel.update(accompaniment)
    }
  } */

  return res.json(orders)
})

app.use('/sessions', sessionsRoutes)

app.use(
  '/files',
  express.static(path.resolve(__dirname, '..', '..', 'tmp', 'uploads'))
)

app.use('/buyers', buyersRoutes)
app.use('/employees', employeesRoutes)
app.use('/providers', providersRoutes)
app.use('/representatives', representativesRoutes)

app.use(auth)

app.post('/files', multer(multerOptions).single('file'), handleCreateFiles)

app.use('/agenda', agendaRoutes)
app.use('/accompaniments', accompanimentsRoutes)
app.use('/activityBranches', activityBranchesRoutes)
app.use('/billsToPay', billsToPayRoutes)
app.use('/branches', branchesRoutes)
app.use('/brands', brandsRoutes)
app.use('/classes', classesRoutes)
app.use('/clients', clientsRoutes)
app.use('/clientWebs', clientWebsRoutes)
app.use('/departments', departmentsRoutes)
app.use('/dischargeTables', dischargeTablesRoutes)
app.use('/distribuitions', distribuitionsRoutes)
app.use('/invoices', invoicesRouter)
app.use('/permissions', permissionsRoutes)
app.use('/regions', regionsRoutes)
app.use('/salesClasses', salesClassesRoutes)
app.use('/scheduleRequests', scheduleRequestsRoutes)
app.use('/schedules', schedulesRoutes)
app.use('/sections', sectionsRoutes)
app.use('/users', usersRoutes)

app.use((_req, _res, next) =>
  next(createHttpError(404, 'Recurso indisponível'))
)
app.use(
  async (error: any, _req: Request, res: Response, next: NextFunction) => {
    if (isHttpError(error)) {
      console.error(error)

      return res.status(error.statusCode).json({ message: error.message })
    }

    next(error)
  }
)

export { app }
