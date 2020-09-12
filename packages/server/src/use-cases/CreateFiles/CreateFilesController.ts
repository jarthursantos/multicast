import { Request, Response } from 'express'

import { CreateFilesUseCase } from './CreateFilesUseCase'

export class CreateFilesController {
  constructor(private createFilesCase: CreateFilesUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const file = await this.createFilesCase.execute(req.file)

      return res.json(file)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
