import { IProviderRepository } from 'repositories/IProviderRepository'

export class FindProvidersUseCase {
  constructor(private providerRepository: IProviderRepository) {}

  async execute(query?: string) {
    const providers = await this.providerRepository.findMany(query)

    return providers
  }
}
