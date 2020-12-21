import createHttpError from 'http-errors'

import { IUser } from '~/domain/IUser'
import { IAccompanimentsModel } from '~/models/accompaniments/IAccompanimentsModel'

import { ICancelAccompanimentsDTO } from './dto'

export function createCancelAccompanimentsModule(
  accompanimentsModel: IAccompanimentsModel
) {
  return {
    async execute(id: string, data: ICancelAccompanimentsDTO, user: IUser) {
      const accompaniment = await accompanimentsModel.findById(id)

      if (!accompaniment) {
        throw new createHttpError.NotFound('Acompanhamento não encontrado')
      }

      await accompanimentsModel.cancel(accompaniment, data, user)
    }
  }
}
