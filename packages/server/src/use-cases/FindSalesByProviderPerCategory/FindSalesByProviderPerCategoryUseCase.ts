import { ISalesByProviderRepository } from 'repositories/ISalesByProviderRepository'
import { IFindSalesByProviderDTO } from 'utils/parse-sales-by-provider-options'

export class FindSalesByProviderPerCategoryUseCase {
  constructor(private salesByProviderRepository: ISalesByProviderRepository) {}

  async execute(options: IFindSalesByProviderDTO) {
    const categories = await this.salesByProviderRepository.findPerCategory(
      options
    )

    return categories
  }
}
