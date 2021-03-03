import { IAccompanimentsModel } from '~/models/accompaniments/IAccompanimentsModel'

import { IFindCanceledAccompanimentsOptions } from './parser'

export function createFindCanceledAccompanimentsModule(
  accompanimentsModel: IAccompanimentsModel
) {
  return {
    async execute(filters?: IFindCanceledAccompanimentsOptions) {
      const accompaniments = await accompanimentsModel.findCanceleds(filters)

      return accompaniments
    }
  }
}
