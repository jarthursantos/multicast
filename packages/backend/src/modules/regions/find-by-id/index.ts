import { IRegionsModel } from '~/models/regions/IRegionsModel'

export function createFindRegionByIdModule(regionsModel: IRegionsModel) {
  return {
    async execute(id: number) {
      const region = await regionsModel.findById(id)

      return region
    }
  }
}
