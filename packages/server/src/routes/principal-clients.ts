import { Router, Request, Response } from 'express'
import { findPrincipalClientByCodeController } from 'use-cases/FindPrincipalClientByCode'
import { findPrincipalClientsController } from 'use-cases/FindPrincipalClients'

const router = Router()

router.get('/principalClients', (req: Request, res: Response) => {
  findPrincipalClientsController.handle(req, res)
})

router.get('/principalClients/:id', (req: Request, res: Response) => {
  findPrincipalClientByCodeController.handle(req, res)
})

export { router as principalClientRouter }
