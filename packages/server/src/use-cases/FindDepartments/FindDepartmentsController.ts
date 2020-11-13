import { Request, Response } from 'express'

import { FindDepartmentsUseCase } from './FindDepartmentsUseCase'

export class FindDepartmentsController {
  constructor(private findDepartmentsCase: FindDepartmentsUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const departments = await this.findDepartmentsCase.execute()

      return res.json(departments)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
