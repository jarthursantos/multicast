import createHttpError from 'http-errors'

import { ISchedulesModel } from '~/models/schedules/ISchedulesModel'

import { ISearchSchedulesOptions } from './parser'

export function createSearchSchedulesModule(schedulesModel: ISchedulesModel) {
  return {
    async execute(options?: ISearchSchedulesOptions) {
      if (!options) {
        throw new createHttpError.BadRequest('As opções são inválidas')
      }

      return await schedulesModel.search(options.date, options.query)
    }
  }
}
