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

import { dischargeTablesRouter } from './discharge-tables'
import { employeesRouter } from './employees'
import { invoicesRouter } from './invoices'
import { permissionsRouter } from './permissions'
import { providersRouter } from './providers'
import { reportsRouter } from './reports'
import { schedulesRouter } from './schedules'
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

router.use(reportsRouter)

router.use((_, res, next) => {
  res
    .status(400)
    .json({ message: 'Você não tem permissão para executar esta ação' })

  next()
})

export { router }
