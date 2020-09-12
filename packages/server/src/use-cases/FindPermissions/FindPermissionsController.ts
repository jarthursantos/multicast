import { Request, Response } from 'express'

import { FindPermissionsUseCase } from './FindPermissionsUseCase'

export class FindPermissionsController {
  constructor(private findPermissionsCase: FindPermissionsUseCase) {}

  async handle(_req: Request, res: Response) {
    try {
      const permissions = await this.findPermissionsCase.execute()

      return res.json(permissions)
    } catch (err) {
      return res.status(400).json({
        message: err.message || 'Unexpected Error'
      })
    }
  }
}
