import { Request, Response } from 'express'

import { FindSupervisorsUseCase } from './FindSupervisorsUseCase'

export class FindSupervisorsController {
  constructor(private findSupervisorsCase: FindSupervisorsUseCase) {}

  async handle(_req: Request, res: Response) {
    try {
      const supervisors = await this.findSupervisorsCase.execute()

      return res.json(supervisors)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
