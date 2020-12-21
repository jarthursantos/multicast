import { IBuyersModel } from '~/models/buyers/IBuyersModel'

export function createFindAllBuyersModule(buyersModel: IBuyersModel) {
  return {
    async execute() {
      const buyers = await buyersModel.findMany()

      return buyers
    }
  }
}
