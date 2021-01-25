import createHttpError from 'http-errors'

import { IAccompanimentsModel } from '~/models/accompaniments/IAccompanimentsModel'

export function createMarkAccompanimentAsSendedModule(
  accompanimentsModel: IAccompanimentsModel
) {
  return {
    async execute(id: string) {
      const accompaniment = await accompanimentsModel.findById(id)

      if (!accompaniment) {
        throw new createHttpError.NotFound('Acompanhamento não encontrado')
      }

      accompaniment.sendedAt = new Date()

      return await accompanimentsModel.update(accompaniment)
    }
  }
}
