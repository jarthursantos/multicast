import { ISalesByProviderRepository } from 'repositories/ISalesByProviderRepository'
import { IFindSalesByProviderDTO } from 'utils/parse-sales-by-provider-options'

export class FindSalesByProviderPerCategoryProductUseCase {
  constructor(private salesByProviderRepository: ISalesByProviderRepository) {}

  async execute(options: IFindSalesByProviderDTO) {
    const categoryProducts = await this.salesByProviderRepository.findPerCategoryProduct(
      options
    )

    return categoryProducts
  }
}
