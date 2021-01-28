import { Request, Response } from 'express'

import { findInvoiceProductsModule } from '~/modules/invoice-products'

export async function handleFindInvoiceProducts(req: Request, res: Response) {
  const { id } = req.params

  const result = await findInvoiceProductsModule.execute(id)

  res.json(result)
}
