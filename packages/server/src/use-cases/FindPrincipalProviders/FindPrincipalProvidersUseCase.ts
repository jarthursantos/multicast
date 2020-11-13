import { IPrincipalProviderRepository } from 'repositories/IPrincipalProviderRepository'

export class FindPrincipalProvidersUseCase {
  constructor(
    private principalProviderRepository: IPrincipalProviderRepository
  ) {}

  async execute() {
    const providers = await this.principalProviderRepository.findMany()

    return providers
  }
}
