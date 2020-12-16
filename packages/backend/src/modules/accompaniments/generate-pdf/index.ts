import createHttpError from 'http-errors'

import { IAccompanimentsModel } from '~/models/accompaniments/IAccompanimentsModel'
import { IAccompanimentMailMessageProvider } from '~/providers/accompaniment-mail-message/IAccompanimentMailMessageProvider'

export function createGenerateAccompanimentsPDFModule(
  accompanimentsModel: IAccompanimentsModel,
  accompanimentMailMessageProvider: IAccompanimentMailMessageProvider
) {
  return {
    async execute(id: string) {
      const accompaniment = await accompanimentsModel.findById(id)

      if (!accompaniment) {
        throw new createHttpError.NotFound('Acompanhamento não encontrado')
      }

      const result = await accompanimentMailMessageProvider.generate(
        accompaniment
      )

      return result
    }
  }
}
