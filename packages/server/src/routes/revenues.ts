import { Router, Response } from 'express'
import { findRevenuesPerActuationAreaController } from 'use-cases/FindRevenuesPerActuationArea'
import { findRevenuesPerAnaliticController } from 'use-cases/FindRevenuesPerAnalitic'
import { findRevenuesPerChargeController } from 'use-cases/FindRevenuesPerCharge'
import { findRevenuesPerCheckOutController } from 'use-cases/FindRevenuesPerCheckOut'
import { findRevenuesPerClassController } from 'use-cases/FindRevenuesPerClass'
import { findRevenuesPerDeadlineController } from 'use-cases/FindRevenuesPerDeadline'
import { findRevenuesPerEmitterController } from 'use-cases/FindRevenuesPerEmitter'
import { findRevenuesPerEvolutionController } from 'use-cases/FindRevenuesPerEvolution'
import { findRevenuesPerMonthController } from 'use-cases/FindRevenuesPerMonth'
import { findRevenuesPerProviderController } from 'use-cases/FindRevenuesPerProvider'
import { findRevenuesPerRegionController } from 'use-cases/FindRevenuesPerRegion'
import { findRevenuesPerSalesOriginController } from 'use-cases/FindRevenuesPerSalesOrigin'
import { findRevenuesPerSalesOriginEmitterController } from 'use-cases/FindRevenuesPerSalesOriginEmitter'
import { findRevenuesPerSalesOriginSupervisorController } from 'use-cases/FindRevenuesPerSalesOriginSupervisor'
import { findRevenuesPerSupervisorController } from 'use-cases/FindRevenuesPerSupervisor'
import {
  FindRevenuesRequest,
  FindRevenuesRequestWithID
} from 'utils/parse-revenues-options'

const router = Router()

router.get(
  '/revenues/supervisors',
  (req: FindRevenuesRequest, res: Response) => {
    findRevenuesPerSupervisorController.handle(req, res)
  }
)

router.get('/revenues/months', (req: FindRevenuesRequest, res: Response) => {
  findRevenuesPerMonthController.handle(req, res)
})

router.get('/revenues/deadlines', (req: FindRevenuesRequest, res: Response) => {
  findRevenuesPerDeadlineController.handle(req, res)
})

router.get(
  '/revenues/evolutions',
  (req: FindRevenuesRequest, res: Response) => {
    findRevenuesPerEvolutionController.handle(req, res)
  }
)

router.get('/revenues/classes', (req: FindRevenuesRequest, res: Response) => {
  findRevenuesPerClassController.handle(req, res)
})

router.get('/revenues/regions', (req: FindRevenuesRequest, res: Response) => {
  findRevenuesPerRegionController.handle(req, res)
})

router.get('/revenues/emitters', (req: FindRevenuesRequest, res: Response) => {
  findRevenuesPerEmitterController.handle(req, res)
})

router.get('/revenues/analitics', (req: FindRevenuesRequest, res: Response) => {
  findRevenuesPerAnaliticController.handle(req, res)
})

router.get('/revenues/charges', (req: FindRevenuesRequest, res: Response) => {
  findRevenuesPerChargeController.handle(req, res)
})

router.get('/revenues/checkOuts', (req: FindRevenuesRequest, res: Response) => {
  findRevenuesPerCheckOutController.handle(req, res)
})

router.get(
  '/revenues/salesOrigins',
  (req: FindRevenuesRequest, res: Response) => {
    findRevenuesPerSalesOriginController.handle(req, res)
  }
)

router.get(
  '/revenues/salesOrigins/emitter/:id',
  (req: FindRevenuesRequestWithID, res: Response) => {
    findRevenuesPerSalesOriginEmitterController.handle(req, res)
  }
)

router.get(
  '/revenues/salesOrigins/supervisor/:id',
  (req: FindRevenuesRequestWithID, res: Response) => {
    findRevenuesPerSalesOriginSupervisorController.handle(req, res)
  }
)

router.get(
  '/revenues/actuationAreas',
  (req: FindRevenuesRequest, res: Response) => {
    findRevenuesPerActuationAreaController.handle(req, res)
  }
)

router.get('/revenues/providers', (req: FindRevenuesRequest, res: Response) => {
  findRevenuesPerProviderController.handle(req, res)
})

export { router as revenuesRouter }
