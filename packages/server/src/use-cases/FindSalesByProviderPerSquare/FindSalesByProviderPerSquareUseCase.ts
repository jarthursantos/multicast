import { ISalesByProviderRepository } from 'repositories/ISalesByProviderRepository'
import { IFindSalesByProviderDTO } from 'utils/parse-sales-by-provider-options'

export class FindSalesByProviderPerSquareUseCase {
  constructor(private salesByProviderRepository: ISalesByProviderRepository) {}

  async execute(options: IFindSalesByProviderDTO) {
    const squares = await this.salesByProviderRepository.findPerSquare(options)

    return squares
  }
}
