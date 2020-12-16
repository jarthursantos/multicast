import createHttpError from 'http-errors'

import { createAnnotation } from '~/domain/IAnnotation'
import { IUser } from '~/domain/IUser'
import { IAccompanimentsModel } from '~/models/accompaniments/IAccompanimentsModel'
import { IAnnotationsModel } from '~/models/annotations/IAnnotationsModel'

import { ICreateAnnotationsDTO } from './dto'

export function createCreateAccompanimentAnnotationsModule(
  accompanimentModel: IAccompanimentsModel,
  annotationsModel: IAnnotationsModel
) {
  return {
    async execute(
      accompanimentId: string,
      data: ICreateAnnotationsDTO,
      user: IUser
    ) {
      const accompaniment = await accompanimentModel.findById(accompanimentId)

      if (!accompaniment) {
        throw new createHttpError.NotFound('Acompanhamento não encontrado')
      }

      const annotation = createAnnotation({
        ...data,
        user,
        userId: user.id,
        accompanimentId
      })

      await annotationsModel.save(annotation)

      return annotation
    }
  }
}
