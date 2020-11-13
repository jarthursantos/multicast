import { Router, Request, Response } from 'express'
import { findPrincipalProviderByCodeController } from 'use-cases/FindPrincipalProviderByCode'
import { findPrincipalProvidersController } from 'use-cases/FindPrincipalProviders'

const router = Router()

router.get('/principalProviders', (req: Request, res: Response) => {
  findPrincipalProvidersController.handle(req, res)
})

router.get('/principalProviders/:id', (req: Request, res: Response) => {
  findPrincipalProviderByCodeController.handle(req, res)
})

export { router as principalProviderRouter }
