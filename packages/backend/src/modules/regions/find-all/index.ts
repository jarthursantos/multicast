import { IRegionsModel } from '~/models/regions/IRegionsModel'

export function createFindAllRegionsModule(regionsModel: IRegionsModel) {
  return {
    async execute() {
      const regions = await regionsModel.findMany()

      return regions
    }
  }
}
