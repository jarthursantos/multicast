import { Response, Request } from 'express'

import { CreateDischargeTableUseCase } from './CreateDischargeTableUseCase'

export class CreateDischargeTableController {
  constructor(private createDischargeTableCase: CreateDischargeTableUseCase) {}

  async handle(req: Request, res: Response) {
    const { auth, body } = req

    try {
      if (auth.user.role !== 'ADMIN') {
        throw new Error('Usuário sem acesso')
      }

      const dischargeTable = await this.createDischargeTableCase.execute(body)

      return res.json(dischargeTable)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
