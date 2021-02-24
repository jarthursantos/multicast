import createHttpError from 'http-errors'

import { IStockNotificationsModel } from '~/models/stock-notifications/IStockNotificationsModel'

import { IFindStockNotificationsOptions } from './parser'

export function createFindStockNotificationsModule(
  stockNotificationsModel: IStockNotificationsModel
) {
  return {
    async execute(options?: IFindStockNotificationsOptions) {
      if (!options) {
        throw new createHttpError.BadRequest('Opções de busca inválidas')
      }

      const result = await stockNotificationsModel.find(options)

      return result
    }
  }
}
