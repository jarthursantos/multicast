import { IPrincipalProviderRepository } from 'repositories/IPrincipalProviderRepository'

export class FindPrincipalProviderByCodeUseCase {
  constructor(
    private principalProviderRepository: IPrincipalProviderRepository
  ) {}

  async execute(code: number) {
    const provider = await this.principalProviderRepository.findById(code)

    return provider
  }
}
