import { IRepresentativesModel } from '~/models/representatives/IRepresentativesModel'

export function createFindAllRepresentativesModule(
  representativesModel: IRepresentativesModel
) {
  return {
    async execute() {
      const representatives = await representativesModel.findMany()

      return representatives
    }
  }
}
