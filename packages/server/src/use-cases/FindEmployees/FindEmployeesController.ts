import { Request, Response } from 'express'

import { FindEmployeesUseCase } from './FindEmployeesUseCase'

export class FindEmployeesController {
  constructor(private findEmployeesCase: FindEmployeesUseCase) {}

  async handle(req: Request<{}, {}, {}, { name: string }>, res: Response) {
    const { name } = req.query

    try {
      const employees = await this.findEmployeesCase.execute(name)

      return res.json(employees)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
