import { Request, Response, Router } from 'express'
import { validateBody } from 'middlewares/validate-body'
import {
  cancelSchedulesSchema,
  cancelSchedulesController
} from 'use-cases/CancelSchedules'
import { closeSchedulesController } from 'use-cases/CloseSchedules'
import { createConflictedInvoicesController } from 'use-cases/CreateConflictedInvoices'
import { createInvoicesSchema } from 'use-cases/CreateInvoices'
import { createScheduleInvoicesController } from 'use-cases/CreateScheduleInvoices'
import {
  createScheduleRequestController,
  createScheduleRequestsSchema
} from 'use-cases/CreateScheduleRequests'
import {
  createSchedulesSchema,
  createSchedulesController
} from 'use-cases/CreateSchedules'
import { findScheduleRequestsController } from 'use-cases/FindScheduleRequests'
import { findSchedulesController } from 'use-cases/FindSchedules'
import { generateInvoiceReceiptsController } from 'use-cases/GenerateInvoiceReceipts'
import { generateScheduleReceiptsController } from 'use-cases/GenerateScheduleReceipts'
import { nonReceiveConflictedInvoicesController } from 'use-cases/NonReceiveConflictedInvoices'
import { receiveConflictedInvoicesController } from 'use-cases/ReceiveConflictedInvoices'
import {
  receiveSchedulesSchema,
  receiveSchedulesController
} from 'use-cases/ReceiveSchedules'
import { removeScheduleRequestsController } from 'use-cases/RemoveScheduleRequests'
import { rescheduleSchedulesController } from 'use-cases/RescheduleSchedules'
import {
  scheduleScheduleRequestsController,
  scheduleScheduleRequestsSchema
} from 'use-cases/ScheduleScheduleRequests'
import { updateInvoicesSchema } from 'use-cases/UpdateInvoices'
import { updateScheduleInvoicesController } from 'use-cases/UpdateScheduleInvoices'
import {
  updateScheduleRequestsController,
  updateScheduleRequestsSchema
} from 'use-cases/UpdateScheduleRequests'
import {
  updateSchedulesSchema,
  updateSchedulesController
} from 'use-cases/UpdateSchedules'

const router = Router()

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

router.get('/schedules/:id/receipt', (req: Request, res: Response) => {
  generateScheduleReceiptsController.handle(req, res)
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

router.get(
  '/schedules/:id/invoices/:invoiceId/receipt',
  (req: Request, res: Response) => {
    generateInvoiceReceiptsController.handle(req, res)
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

export { router as schedulesRouter }
