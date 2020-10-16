import { IAccompanimentProductsRepository } from 'repositories/IAccompanimentProductsRepository'
import { IAccompanimentsRepository } from 'repositories/IAccompanimentsRepository'

export class FindAccompanimentProductsUseCase {
  constructor(
    private accompanimentsRepository: IAccompanimentsRepository,
    private accompanimentProductsRepository: IAccompanimentProductsRepository
  ) {}

  async execute(id: string, filter?: 'invoice' | 'pending' | 'delivered') {
    const accompaniment = await this.accompanimentsRepository.findById(id)

    if (!accompaniment) {
      throw new Error('Acompanhamento não existe')
    }

    if (filter === 'invoice') {
      return await this.accompanimentProductsRepository.findFromInvoice(
        accompaniment
      )
    } else {
      return await this.accompanimentProductsRepository.find(
        accompaniment,
        filter ? { only: filter } : undefined
      )
    }
  }
}
