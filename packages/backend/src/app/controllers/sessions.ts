import { Request, Response } from 'express'

import { createSessionModule } from '~/modules/sessions'

export async function handleCreateSession(req: Request, res: Response) {
  const result = await createSessionModule.execute(req.body)

  res.json(result)
}
