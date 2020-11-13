import { options as multerOptions } from 'configs/multer'
import cors from 'cors'
import express from 'express'
import { Router, Request, Response } from 'express'
import auth from 'middlewares/auth'
import { validateBody } from 'middlewares/validate-body'
import morgan from 'morgan'
import multer from 'multer'
import { resolve } from 'path'
import { createFilesController } from 'use-cases/CreateFiles'
import {
  createSessionController,
  createSessionSchema
} from 'use-cases/CreateSession'

import { accompanimentsRouter } from './accompaniments'
import { acitivtyBranchesRouter } from './activity-branches'
import { branchesRouter } from './branches'
import { brandsRouter } from './brands'
import { buyersRouter } from './buyers'
import { categoriesRouter } from './categories'
import { classesRouter } from './classes'
import { clientsRouter } from './clients'
import { clientsWebsRouter } from './clients-webs'
import { departmentsRouter } from './departments'
import { dischargeTablesRouter } from './discharge-tables'
import { distribuitionsRouter } from './distribuitions'
import { employeesRouter } from './employees'
import { invoicesRouter } from './invoices'
import { permissionsRouter } from './permissions'
import { principalClientRouter } from './principal-clients'
import { principalProviderRouter } from './principal-provider'
import { productLinesRouter } from './product-lines'
import { productsRouter } from './products'
import { providersRouter } from './providers'
import { purchaseResumesRouter } from './purchase-resumes'
import { rcasRouter } from './rcas'
import { regionsRouter } from './regions'
import { reportsRouter } from './reports'
import { representativesRouter } from './representatives'
import { revenuesRouter } from './revenues'
import { salesClassesRouter } from './sales-classes'
import { schedulesRouter } from './schedules'
import { sectionsRouter } from './sections'
import { squaresRouter } from './squares'
import { stockNotificationsRouter } from './stock-notifications'
import { subcategoriesRouter } from './subcategories'
import { supervisorsRouter } from './supervisors'
import { tributationsRouter } from './tribuitations'
import { usersRouter } from './users'

const router = Router()

router.use(morgan('dev'))
router.use(cors())
router.use(express.json())
router.use(express.urlencoded({ extended: true }))

router.post(
  '/sessions',
  validateBody(createSessionSchema),
  (req: Request, res: Response) => {
    createSessionController.handle(req, res)
  }
)

router.use(
  '/files',
  express.static(resolve(__dirname, '..', '..', 'tmp', 'uploads'))
)

router.use(employeesRouter)

router.use(auth)

router.post(
  '/files',
  multer(multerOptions).single('file'),
  (req: Request, res: Response) => {
    createFilesController.handle(req, res)
  }
)

router.use(usersRouter)
router.use(permissionsRouter)
router.use(schedulesRouter)
router.use(providersRouter)
router.use(invoicesRouter)
router.use(dischargeTablesRouter)
router.use(accompanimentsRouter)
router.use(representativesRouter)
router.use(stockNotificationsRouter)

router.use(reportsRouter)

router.use(acitivtyBranchesRouter)
router.use(branchesRouter)
router.use(brandsRouter)
router.use(buyersRouter)
router.use(categoriesRouter)
router.use(classesRouter)
router.use(clientsRouter)
router.use(clientsWebsRouter)
router.use(departmentsRouter)
router.use(distribuitionsRouter)
router.use(principalClientRouter)
router.use(principalProviderRouter)
router.use(productLinesRouter)
router.use(productsRouter)
router.use(purchaseResumesRouter)
router.use(rcasRouter)
router.use(regionsRouter)
router.use(revenuesRouter)
router.use(salesClassesRouter)
router.use(sectionsRouter)
router.use(squaresRouter)
router.use(subcategoriesRouter)
router.use(supervisorsRouter)
router.use(tributationsRouter)

router.use((_, res, next) => {
  const message = 'Você não tem permissão para executar esta ação'

  res.status(400).json({ message })

  next()
})

export { router }
