import { ISalesByProviderRepository } from 'repositories/ISalesByProviderRepository'
import { IFindSalesByProviderDTO } from 'utils/parse-sales-by-provider-options'

export class FindSalesByProviderPerProductSalesCountUseCase {
  constructor(private salesByProviderRepository: ISalesByProviderRepository) {}

  async execute(options: IFindSalesByProviderDTO) {
    const productSalesCounts = await this.salesByProviderRepository.findPerProductSalesCount(
      options
    )

    return productSalesCounts
  }
}
