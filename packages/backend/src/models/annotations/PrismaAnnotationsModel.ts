import { PrismaClient } from '@prisma/client'

import { createAnnotation, IAnnotation } from '~/domain/IAnnotation'

import { IUsersModel } from '../users/IUsersModel'
import { IAnnotationsModel } from './IAnnotationsModel'

export function createPrismaAnnotationsModel(
  usersModel: IUsersModel
): IAnnotationsModel {
  const prisma = new PrismaClient()

  return {
    async save(annotation: IAnnotation): Promise<void> {
      const { id, content, accompanimentId, userId } = annotation

      await prisma.accompanimentAnnotations.create({
        data: {
          id,
          content,
          accompaniment: { connect: { id: accompanimentId } },
          user: { connect: { id: userId } }
        }
      })
    },

    async findFromAccompaniment(id: string): Promise<IAnnotation[]> {
      const result: IAnnotation[] = []

      const annotations = await prisma.accompanimentAnnotations.findMany({
        where: { accompanimentId: id }
      })

      for (let i = 0; i < annotations.length; i++) {
        const annotation = annotations[i]

        const user = await usersModel.findById(annotation.userId)

        result.push(createAnnotation({ ...annotation, user }, annotation.id))
      }

      return result
    }
  }
}
