import { Request, Response } from 'express'

import { FindClientWebByCodeUseCase } from './FindClientWebByCodeUseCase'

export class FindClientWebByCodeController {
  constructor(private findClientWebByCodeUseCase: FindClientWebByCodeUseCase) {}

  async handle(req: Request, res: Response) {
    const { id } = req.params

    try {
      const web = await this.findClientWebByCodeUseCase.execute(parseInt(id))

      return res.json(web)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
