import { Request, Response } from 'express'

import { findInvoiceProductsModule } from '~/modules/invoice-products'

export async function handleFindInvoiceProducts(req: Request, res: Response) {
  console.log('handleFindInvoiceProducts')

  const { id } = req.params

  const result = await findInvoiceProductsModule.execute(id)

  res.json(result)
}
