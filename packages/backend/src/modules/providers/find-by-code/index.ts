import createHttpError from 'http-errors'

import { IProvidersModel } from '~/models/providers/IProvidersModel'

export function createFindProviderByCodeModule(
  providersModel: IProvidersModel
) {
  return {
    async execute(id: number) {
      const provider = await providersModel.findById(id)

      if (!provider) {
        throw new createHttpError.NotFound('Fornecedor não existe')
      }

      return provider
    }
  }
}
