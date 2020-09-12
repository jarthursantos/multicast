import { Request, Response } from 'express'

import { FindPermissionsByIdUseCase } from './FindPermissionsByIdUseCase'

export class FindPermissionsByIdController {
  constructor(private findPermissionsByIdCase: FindPermissionsByIdUseCase) {}

  async handle(req: Request, res: Response) {
    const { id } = req.params

    try {
      const permissions = await this.findPermissionsByIdCase.execute(id)

      return res.json(permissions)
    } catch (err) {
      return res.status(400).json({
        message: err.message || 'Unexpected Error'
      })
    }
  }
}
