import createHttpError from 'http-errors'

import { IAgendaModel } from '~/models/agenda/IAgendaModel'
import { IProvidersModel } from '~/models/providers/IProvidersModel'

export function createFindByProviderAgendaModule(
  agendaModel: IAgendaModel,
  providersModel: IProvidersModel
) {
  return {
    async execute(providerCode: number) {
      const provider = await providersModel.findById(providerCode)

      if (!provider) {
        throw new createHttpError.NotFound('Fornecedor não encontrado')
      }

      const agenda = await agendaModel.findByProvider(provider)

      return agenda
    }
  }
}
