import { IBrandsModel } from '~/models/brands/IBrandsModel'

export function createFindAllBrandsModule(brandsModel: IBrandsModel) {
  return {
    async execute() {
      const brands = await brandsModel.findMany()

      return brands
    }
  }
}
