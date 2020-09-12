import { IProviderRepository } from 'repositories/IProviderRepository'

export class FindProvidersUseCase {
  constructor(private providerRepository: IProviderRepository) {}

  async execute() {
    const providers = await this.providerRepository.findMany()

    return providers
  }
}
