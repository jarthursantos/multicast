import { IAccompanimentsModel } from '~/models/accompaniments/IAccompanimentsModel'

export function createFindCanceledAccompanimentsModule(
  accompanimentsModel: IAccompanimentsModel
) {
  return {
    async execute() {
      const accompaniments = await accompanimentsModel.findCanceleds()

      return accompaniments
    }
  }
}
