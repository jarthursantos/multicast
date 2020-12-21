import 'express-async-errors'

import cors from 'cors'
import express, { Request, Response, NextFunction } from 'express'
import createHttpError, { isHttpError } from 'http-errors'
import logger from 'morgan'
import multer from 'multer'
import path from 'path'

import { auth } from '~/app/middlewares/authentication'
import { accompanimentsRoutes } from '~/app/routes/accompaniments'
import { activityBranchesRoutes } from '~/app/routes/activity-branches'
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
import { salesClassesRoutes } from '~/app/routes/sales-classes'
import { scheduleRequestsRoutes } from '~/app/routes/schedule-requests'
import { schedulesRoutes } from '~/app/routes/schedules'
import { sectionsRoutes } from '~/app/routes/sections'
import { sessionsRoutes } from '~/app/routes/sessions'
import { usersRoutes } from '~/app/routes/users'
import multerOptions from '~/configs/multer'

import { handleCreateFiles } from './controllers/files'

const app = express()

app.use(express.json())
app.use(cors())
app.use(logger('dev'))

app.use('/sessions', sessionsRoutes)

app.use(
  '/files',
  express.static(path.resolve(__dirname, '..', '..', 'tmp', 'uploads'))
)

app.use('/employees', employeesRoutes)

app.use(auth)

app.post('/files', multer(multerOptions).single('file'), handleCreateFiles)

app.use('/accompaniments', accompanimentsRoutes)
app.use('/activityBranches', activityBranchesRoutes)
app.use('/billsToPay', billsToPayRoutes)
app.use('/branches', branchesRoutes)
app.use('/brands', brandsRoutes)
app.use('/buyers', buyersRoutes)
app.use('/classes', classesRoutes)
app.use('/clients', clientsRoutes)
app.use('/clientWebs', clientWebsRoutes)
app.use('/departments', departmentsRoutes)
app.use('/dischargeTables', dischargeTablesRoutes)
app.use('/distribuitions', distribuitionsRoutes)
app.use('/invoices', invoicesRouter)
app.use('/permissions', permissionsRoutes)
app.use('/providers', providersRoutes)
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
      return res.status(error.statusCode).json({ message: error.message })
    }

    next(error)
  }
)

export { app }
