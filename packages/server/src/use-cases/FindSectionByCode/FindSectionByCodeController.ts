import { Request, Response } from 'express'

import { FindSectionByCodeUseCase } from './FindSectionByCodeUseCase'

export class FindSectionByCodeController {
  constructor(private findSectionByCodeCase: FindSectionByCodeUseCase) {}

  async handle(req: Request, res: Response) {
    const { id } = req.params

    try {
      const section = await this.findSectionByCodeCase.execute(parseInt(id))

      return res.json(section)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
