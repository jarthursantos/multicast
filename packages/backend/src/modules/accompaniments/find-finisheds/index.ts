import { IAccompanimentsModel } from '~/models/accompaniments/IAccompanimentsModel'

export function createFindFinishedAccompanimentsModule(
  accompanimentsModel: IAccompanimentsModel
) {
  return {
    async execute() {
      const accompaniments = await accompanimentsModel.findFinisheds()

      return accompaniments
    }
  }
}
