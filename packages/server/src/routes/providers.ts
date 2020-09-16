import { Request, Response, Router } from 'express'
import { findProviderByIdController } from 'use-cases/FindProviderById'
import { findProvidersController } from 'use-cases/FindProviders'

const router = Router()

router.get('/providers', (req: Request, res: Response) => {
  findProvidersController.handle(req, res)
})

router.get('/providers/:id', (req: Request, res: Response) => {
  findProviderByIdController.handle(req, res)
})

export { router as providersRouter }
