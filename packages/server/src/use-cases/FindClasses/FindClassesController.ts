import { Request, Response } from 'express'

import { FindClassesUseCase } from './FindClassesUseCase'

export class FindClassesController {
  constructor(private findClassesUseCase: FindClassesUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const classes = await this.findClassesUseCase.execute()

      return res.json(classes)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
