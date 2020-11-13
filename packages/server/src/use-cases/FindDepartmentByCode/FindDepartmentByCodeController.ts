import { Request, Response } from 'express'

import { FindDepartmentByCodeUseCase } from './FindDepartmentByCodeUseCase'

export class FindDepartmentByCodeController {
  constructor(private findDepartmentByCodeCase: FindDepartmentByCodeUseCase) {}

  async handle(req: Request, res: Response) {
    const { id } = req.params

    try {
      const department = await this.findDepartmentByCodeCase.execute(
        parseInt(id)
      )

      return res.json(department)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
