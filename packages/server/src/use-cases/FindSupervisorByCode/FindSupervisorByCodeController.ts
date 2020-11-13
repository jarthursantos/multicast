import { Request, Response } from 'express'

import { FindSupervisorByCodeUseCase } from './FindSupervisorByCodeUseCase'

export class FindSupervisorByCodeController {
  constructor(private findSupervisorByCodeCase: FindSupervisorByCodeUseCase) {}

  async handle(req: Request, res: Response) {
    const { id } = req.params

    try {
      const supervisor = await this.findSupervisorByCodeCase.execute(
        parseInt(id)
      )

      return res.json(supervisor)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
