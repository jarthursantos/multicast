import { Request, Response } from 'express'

import { FindSectionsUseCase } from './FindSectionsUseCase'

export class FindSectionsController {
  constructor(private findSectionsUseCase: FindSectionsUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const sections = await this.findSectionsUseCase.execute()

      return res.json(sections)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
