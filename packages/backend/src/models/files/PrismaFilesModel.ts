import { PrismaClient } from '@prisma/client'
import { pick } from 'lodash'

import { IFile } from '~/domain/IFile'

import { IFilesModel } from './IFilesModel'

export function createPrismaFilesModel(): IFilesModel {
  const prisma = new PrismaClient()

  return {
    async save(file: IFile): Promise<void> {
      await prisma.files.create({
        data: pick(file, 'filename', 'originalname', 'id')
      })
    }
  }
}
