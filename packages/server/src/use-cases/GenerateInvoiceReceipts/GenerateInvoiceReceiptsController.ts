import { Request, Response } from 'express'

import { GenerateInvoiceReceiptsUseCase } from './GenerateInvoiceReceiptsUseCase'

export class GenerateInvoiceReceiptsController {
  constructor(
    private generateInvoiceReceiptsCase: GenerateInvoiceReceiptsUseCase
  ) {}

  async handle(req: Request, res: Response) {
    const { id, invoiceId } = req.params

    try {
      const receipt = await this.generateInvoiceReceiptsCase.execute(
        id,
        invoiceId
      )

      return res.json(receipt)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
