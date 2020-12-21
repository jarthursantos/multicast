import { Request, Response } from 'express'

import { createFilesModule } from '~/modules/files'

export async function handleCreateFiles(req: Request, res: Response) {
  const result = await createFilesModule.execute(req.file)

  res.json(result)
}
