import { IProvidersModel } from '~/models/providers/IProvidersModel'

import { ISearchProvidersOptions } from './parser'

export function createSearchProviderModule(providersModel: IProvidersModel) {
  return {
    async execute({ query = '' }: ISearchProvidersOptions) {
      const providers = await providersModel.findMany(
        query.trim().toUpperCase()
      )

      return providers
    }
  }
}
