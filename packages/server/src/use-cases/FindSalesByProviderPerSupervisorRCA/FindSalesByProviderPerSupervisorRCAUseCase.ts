import { ISalesByProviderRepository } from 'repositories/ISalesByProviderRepository'
import { IFindSalesByProviderDTO } from 'utils/parse-sales-by-provider-options'

export class FindSalesByProviderPerSupervisorRCAUseCase {
  constructor(private salesByProviderRepository: ISalesByProviderRepository) {}

  async execute(options: IFindSalesByProviderDTO) {
    const supervisorRCAs = await this.salesByProviderRepository.findPerSupervisorRCA(
      options
    )

    return supervisorRCAs
  }
}
