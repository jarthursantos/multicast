import createHttpError from 'http-errors'

import { IDistribuitionsModel } from '~/models/distribuitions/IDistribuitionsModel'

export function createFindDistribuitionsByIdModule(
  distribuitionsModel: IDistribuitionsModel
) {
  return {
    async execute(code: string) {
      const distribuition = await distribuitionsModel.findById(code)

      if (!distribuition) {
        throw new createHttpError.NotFound('Distribuição não encontrada')
      }

      return distribuition
    }
  }
}
