import { IProviderRepository } from 'repositories/IProviderRepository'

export class FindProviderByIdUseCase {
  constructor(private providerRepository: IProviderRepository) {}

  async execute(id: number) {
    const provider = await this.providerRepository.findById(id)

    if (!provider) {
      throw Error('Fornecedor não existe')
    }

    return provider
  }
}
