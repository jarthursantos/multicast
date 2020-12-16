import { IDistribuitionsModel } from '~/models/distribuitions/IDistribuitionsModel'

export function createFindAllDistribuitionsModule(
  distribuitionsModel: IDistribuitionsModel
) {
  return {
    async execute() {
      const distribuition = await distribuitionsModel.findMany()

      return distribuition
    }
  }
}
