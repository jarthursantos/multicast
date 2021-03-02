import { Request, Response } from 'express'

import {
  cancelAccompanimentsModule,
  createAccompanimentAnnotationsModule,
  findAccompanimentByIdModule,
  findCanceledAccompanimentsModule,
  findAccompanimentUntrackedInvoices,
  findAccompanimentsProductsModule,
  findAllAccompanimentsModule,
  findFinishedAccompanimentsModule,
  generateAccompanimentsPDFModule,
  markAccompanimentAsFinishedModule,
  markAccompanimentAsReleasedModule,
  markAccompanimentAsReviewedModule,
  markAccompanimentAsSendedModule,
  renewAccompanimentsModule,
  updateAccompanimentsModule,
  parseFindAccompanimentProductsOptions,
  IFindAccompanimentProductsRequest
} from '~/modules/accompaniments'

export async function handleFindAllAccompaniments(req: Request, res: Response) {
  const result = await findAllAccompanimentsModule.execute()

  res.json(result)
}

export async function handleFindCanceledAccompaniments(
  req: Request,
  res: Response
) {
  console.log(req.query)

  const result = await findCanceledAccompanimentsModule.execute()

  res.json(result)
}

export async function handleFindFinishedAccompaniments(
  req: Request,
  res: Response
) {
  console.log(req.query)

  const result = await findFinishedAccompanimentsModule.execute()

  res.json(result)
}

export async function handleFindAccompanimentById(req: Request, res: Response) {
  const { id } = req.params

  const result = await findAccompanimentByIdModule.execute(id)

  res.json(result)
}

export async function handleGenerateAccompanimentPDFReport(
  req: Request,
  res: Response
) {
  const { id } = req.params

  const result = await generateAccompanimentsPDFModule.execute(id)

  res.json(result)
}

export async function handleUpdateAccompaniments(req: Request, res: Response) {
  const { id } = req.params

  const result = await updateAccompanimentsModule.execute(id, req.body)

  res.json(result)
}

export async function handleCancelAccompaniments(req: Request, res: Response) {
  const { body, auth } = req
  const { id } = req.params

  const result = await cancelAccompanimentsModule.execute(id, body, auth.user)

  res.json(result)
}

export async function handleFindAccompanimentProducts(
  req: IFindAccompanimentProductsRequest,
  res: Response
) {
  const { id } = req.params

  const result = await findAccompanimentsProductsModule.execute(
    id,
    parseFindAccompanimentProductsOptions(req.query)
  )

  res.json(result)
}

export async function handleFindAccompanimentUntrackedInvoices(
  req: Request,
  res: Response
) {
  const { id } = req.params

  const result = await findAccompanimentUntrackedInvoices.execute(id)

  res.json(result)
}

export async function handleRenewAccompaniments(req: Request, res: Response) {
  const { id } = req.params

  const result = await renewAccompanimentsModule.execute(id)

  res.json(result)
}

export async function handleCreateAccompanimentAnnotations(
  req: Request,
  res: Response
) {
  const { body, auth } = req
  const { id } = req.params

  const result = await createAccompanimentAnnotationsModule.execute(
    id,
    body,
    auth.user
  )

  res.json(result)
}

export async function handleMarkAccompanimentAsSended(
  req: Request,
  res: Response
) {
  const { id } = req.params

  const result = await markAccompanimentAsSendedModule.execute(id)

  res.json(result)
}

export async function handleMarkAccompanimentAsFinished(
  req: Request,
  res: Response
) {
  const { id } = req.params

  const result = await markAccompanimentAsFinishedModule.execute(id)

  res.json(result)
}

export async function handleMarkAccompanimentAsReleased(
  req: Request,
  res: Response
) {
  const { id } = req.params

  const result = await markAccompanimentAsReleasedModule.execute(id)

  res.json(result)
}

export async function handleMarkAccompanimentAsReviewed(
  req: Request,
  res: Response
) {
  const { id } = req.params

  const result = await markAccompanimentAsReviewedModule.execute(id)

  res.json(result)
}
