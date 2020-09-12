import { Request, Response } from 'express'

import { FindDischargeTablesUseCase } from './FindDischargeTablesUseCase'

export class FindDischargeTablesController {
  constructor(private findDischargeTablesCase: FindDischargeTablesUseCase) {}

  async handle(req: Request, res: Response) {
    const { auth } = req

    try {
      if (!auth.permissions.accessSchedules) {
        throw new Error('Usuário sem acesso')
      }

      const dischargeTable = await this.findDischargeTablesCase.execute()

      return res.json(dischargeTable)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
