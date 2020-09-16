import { Request, Response } from 'express'
import { ValidationError } from 'yup'

import { generateScheduleCostsReportsSchema } from './GenerateScheduleCostsReportsSchema'
import { GenerateScheduleCostsReportsUseCase } from './GenerateScheduleCostsReportsUseCase'

export class GenerateScheduleCostsReportsController {
  constructor(
    private generateScheduleCostsReportsCase: GenerateScheduleCostsReportsUseCase
  ) {}

  async handle(req: Request, res: Response) {
    const { periodStart, periodEnd } = req.params

    try {
      await generateScheduleCostsReportsSchema.validate(
        { periodStart, periodEnd },
        {
          abortEarly: false
        }
      )

      const report = await this.generateScheduleCostsReportsCase.execute({
        periodStart,
        periodEnd
      })

      return res.json(report)
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(400).json({ message: error.errors.join(', ') })
      }

      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
