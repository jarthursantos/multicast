import { IAccompanimentsModel } from '~/models/accompaniments/IAccompanimentsModel'

import { IFindFinishedAccompanimentsOptions } from './parser'

export function createFindFinishedAccompanimentsModule(
  accompanimentsModel: IAccompanimentsModel
) {
  return {
    async execute(filters?: IFindFinishedAccompanimentsOptions) {
      const accompaniments = await accompanimentsModel.findFinisheds(filters)

      return accompaniments
    }
  }
}
