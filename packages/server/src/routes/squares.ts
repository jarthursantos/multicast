import { Router, Request, Response } from 'express'
import { findSquareByCodeController } from 'use-cases/FindSquareByCode'
import { findSquaresController } from 'use-cases/FindSquares'

const router = Router()

router.get('/squares', (req: Request, res: Response) => {
  findSquaresController.handle(req, res)
})

router.get('/squares/:id', (req: Request, res: Response) => {
  findSquareByCodeController.handle(req, res)
})

export { router as squaresRouter }
