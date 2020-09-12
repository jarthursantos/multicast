import { options as multerOptions } from 'configs/multer'
import express from 'express'
import { Router, Request, Response } from 'express'
import auth from 'middlewares/auth'
import { validateBody } from 'middlewares/validate-body'
import multer from 'multer'
import { resolve } from 'path'
import {
  cancelSchedulesController,
  cancelSchedulesSchema
} from 'use-cases/CancelSchedules'
import { closeSchedulesController } from 'use-cases/CloseSchedules'
import { createConflictedInvoicesController } from 'use-cases/CreateConflictedInvoices'
import {
  createDischargeTableController,
  createDischargeTableSchema
} from 'use-cases/CreateDischargeTables'
import { createFilesController } from 'use-cases/CreateFiles'
import { createInvoicesSchema } from 'use-cases/CreateInvoices'
import {
  createPermissionsController,
  createPermissionsSchema
} from 'use-cases/CreatePermissions'
import { createScheduleInvoicesController } from 'use-cases/CreateScheduleInvoices'
import {
  createScheduleRequestController,
  createScheduleRequestsSchema
} from 'use-cases/CreateScheduleRequests'
import {
  createSchedulesSchema,
  createSchedulesController
} from 'use-cases/CreateSchedules'
import {
  createSessionController,
  createSessionSchema
} from 'use-cases/CreateSession'
import { createUserController, createUserSchema } from 'use-cases/CreateUser'
import { disableUserController } from 'use-cases/DisableUser'
import { enableUserController } from 'use-cases/EnableUser'
import { findDischargeTablesController } from 'use-cases/FindDischargeTables'
import { findInvoiceProductsController } from 'use-cases/FindInvoiceProducts'
import { findPermissionsByIdController } from 'use-cases/FindPermissionById'
import { findPermissionsController } from 'use-cases/FindPermissions'
import { findProviderByIdController } from 'use-cases/FindProviderById'
import { findProvidersController } from 'use-cases/FindProviders'
import { findScheduleRequestsController } from 'use-cases/FindScheduleRequests'
import { findSchedulesController } from 'use-cases/FindSchedules'
import { findUserByIdController } from 'use-cases/FindUserById'
import { findUserChangesController } from 'use-cases/FindUserChanges'
import { findUsersController } from 'use-cases/FindUsers'
import { nonReceiveConflictedInvoicesController } from 'use-cases/NonReceiveConflictedInvoices'
import { receiveConflictedInvoicesController } from 'use-cases/ReceiveConflictedInvoices'
import {
  receiveSchedulesController,
  receiveSchedulesSchema
} from 'use-cases/ReceiveSchedules'
import { removeScheduleRequestsController } from 'use-cases/RemoveScheduleRequests'
import { rescheduleSchedulesController } from 'use-cases/RescheduleSchedules'
import {
  scheduleScheduleRequestsSchema,
  scheduleScheduleRequestsController
} from 'use-cases/ScheduleScheduleRequests'
import { updateInvoicesSchema } from 'use-cases/UpdateInvoices'
import {
  updatePermissionsController,
  updatePermissionsSchema
} from 'use-cases/UpdatePermissions'
import { updateScheduleInvoicesController } from 'use-cases/UpdateScheduleInvoices'
import {
  updateScheduleRequestsSchema,
  updateScheduleRequestsController
} from 'use-cases/UpdateScheduleRequests'
import {
  updateSchedulesController,
  updateSchedulesSchema
} from 'use-cases/UpdateSchedules'
import { updateUserController, updateUserSchema } from 'use-cases/UpdateUser'

const router = Router()

router.post(
  '/sessions',
  validateBody(createSessionSchema),
  (req: Request, res: Response) => {
    createSessionController.handle(req, res)
  }
)

router.use('/files', express.static(resolve(__dirname, '..', 'tmp', 'uploads')))

router.use(auth)

// #region file upload

router.post(
  '/files',
  multer(multerOptions).single('file'),
  (req: Request, res: Response) => {
    createFilesController.handle(req, res)
  }
)

// #endregion

// #region users

router.get('/users', (req: Request, res: Response) => {
  findUsersController.handle(req, res)
})

router.get('/users/:id', (req: Request, res: Response) => {
  findUserByIdController.handle(req, res)
})

router.post(
  '/users',
  validateBody(createUserSchema),
  (req: Request, res: Response) => {
    createUserController.handle(req, res)
  }
)

router.put(
  '/users/:id',
  validateBody(updateUserSchema),
  (req: Request, res: Response) => {
    updateUserController.handle(req, res)
  }
)

router.delete('/users/:id', (req: Request, res: Response) => {
  disableUserController.handle(req, res)
})

router.put('/users/:id/enable', (req: Request, res: Response) => {
  enableUserController.handle(req, res)
})

router.get('/users/:id/changes', (req: Request, res: Response) => {
  findUserChangesController.handle(req, res)
})

// #endregion

// #region permission

router.get('/permissions', (req: Request, res: Response) => {
  findPermissionsController.handle(req, res)
})

router.get('/permissions/:id', (req: Request, res: Response) => {
  findPermissionsByIdController.handle(req, res)
})

router.post(
  '/permissions',
  validateBody(createPermissionsSchema),
  (req: Request, res: Response) => {
    createPermissionsController.handle(req, res)
  }
)

router.put(
  '/permissions/:id',
  validateBody(updatePermissionsSchema),
  (req: Request, res: Response) => {
    updatePermissionsController.handle(req, res)
  }
)

// #endregion

// #region schedules

router.post(
  '/scheduleRequests',
  validateBody(createScheduleRequestsSchema),
  (req: Request, res: Response) => {
    createScheduleRequestController.handle(req, res)
  }
)

router.post(
  '/scheduleRequests/:id/schedule',
  validateBody(scheduleScheduleRequestsSchema),
  (req: Request, res: Response) => {
    scheduleScheduleRequestsController.handle(req, res)
  }
)

router.put(
  '/scheduleRequests/:id',
  validateBody(updateScheduleRequestsSchema),
  (req: Request, res: Response) => {
    updateScheduleRequestsController.handle(req, res)
  }
)

router.delete('/scheduleRequests/:id', (req: Request, res: Response) => {
  removeScheduleRequestsController.handle(req, res)
})

router.get('/scheduleRequests', (req: Request, res: Response) => {
  findScheduleRequestsController.handle(req, res)
})

router.post(
  '/schedules',
  validateBody(createSchedulesSchema),
  (req: Request, res: Response) => {
    createSchedulesController.handle(req, res)
  }
)

router.get('/schedules', (req: Request, res: Response) => {
  findSchedulesController.handle(req, res)
})

router.get('/schedules/:id', (req: Request, res: Response) => {
  return res.json([])
})

router.put(
  '/schedules/:id',
  validateBody(updateSchedulesSchema),
  (req: Request, res: Response) => {
    updateSchedulesController.handle(req, res)
  }
)

router.delete(
  '/schedules/:id',
  validateBody(cancelSchedulesSchema),
  (req: Request, res: Response) => {
    cancelSchedulesController.handle(req, res)
  }
)

router.put('/schedules/:id/close', (req: Request, res: Response) => {
  closeSchedulesController.handle(req, res)
})

router.put(
  '/schedules/:id/receive',
  validateBody(receiveSchedulesSchema),
  (req: Request, res: Response) => {
    receiveSchedulesController.handle(req, res)
  }
)

router.put('/schedules/:id/reschedule', (req: Request, res: Response) => {
  rescheduleSchedulesController.handle(req, res)
})

router.post(
  '/schedules/:id/invoices',
  validateBody(createInvoicesSchema),
  (req: Request, res: Response) => {
    createScheduleInvoicesController.handle(req, res)
  }
)

router.put(
  '/schedules/:id/invoices/:invoiceId',
  validateBody(updateInvoicesSchema),
  (req: Request, res: Response) => {
    updateScheduleInvoicesController.handle(req, res)
  }
)

router.post(
  '/schedules/:id/conflictedInvoices',
  validateBody(createInvoicesSchema),
  (req: Request, res: Response) => {
    createConflictedInvoicesController.handle(req, res)
  }
)

router.put(
  '/schedules/:id/conflictedInvoices/:invoiceId/receive',
  (req: Request, res: Response) => {
    receiveConflictedInvoicesController.handle(req, res)
  }
)

router.put(
  '/schedules/:id/conflictedInvoices/:invoiceId/nonReceive',
  (req: Request, res: Response) => {
    nonReceiveConflictedInvoicesController.handle(req, res)
  }
)

// #endregion

// #region providers

router.get('/providers', (req: Request, res: Response) => {
  findProvidersController.handle(req, res)
})

router.get('/providers/:id', (req: Request, res: Response) => {
  findProviderByIdController.handle(req, res)
})

// #endregion

// #region invoices

router.get('/invoices/:id/products', (req: Request, res: Response) => {
  findInvoiceProductsController.handle(req, res)
})

// #endregion

// #region discharge table

router.get('/dischargeTables', (req: Request, res: Response) => {
  findDischargeTablesController.handle(req, res)
})

router.post(
  '/dischargeTables',
  validateBody(createDischargeTableSchema),
  (req: Request, res: Response) => {
    createDischargeTableController.handle(req, res)
  }
)

// #endregion

router.use((_req, res, next) => {
  res.status(400).json({ message: 'Ação não encontrada' })

  next()
})

export { router }
