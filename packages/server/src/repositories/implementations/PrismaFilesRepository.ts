import { PrismaClient } from '@prisma/client'
import { File } from 'entities/File'
import { pick } from 'lodash'
import { IFilesRepository } from 'repositories/IFilesRepository'

export class PrismaFilesRepository implements IFilesRepository {
  private prisma = new PrismaClient()

  async save(file: File): Promise<void> {
    await this.prisma.files.create({
      data: pick(file, 'filename', 'originalname', 'id')
    })
  }
}
