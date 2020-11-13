import { ISalesByProviderRepository } from 'repositories/ISalesByProviderRepository'
import { IFindSalesByProviderDTO } from 'utils/parse-sales-by-provider-options'

export class FindSalesByProviderPerRegionUseCase {
  constructor(private salesByProviderRepository: ISalesByProviderRepository) {}

  async execute(options: IFindSalesByProviderDTO) {
    const regions = await this.salesByProviderRepository.findPerRegion(options)

    return regions
  }
}
