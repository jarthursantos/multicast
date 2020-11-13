import { Router, Request, Response } from 'express'
import { findClientByCodeController } from 'use-cases/FindClientByCode'
import { findClientsController } from 'use-cases/FindClients'

const router = Router()

router.get('/clients', (req: Request, res: Response) => {
  findClientsController.handle(req, res)
})

router.get('/clients/:id', (req: Request, res: Response) => {
  findClientByCodeController.handle(req, res)
})

export { router as clientsRouter }
