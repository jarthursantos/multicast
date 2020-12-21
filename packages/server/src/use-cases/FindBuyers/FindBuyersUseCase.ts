import { IBuyerRepository } from 'repositories/IBuyerRepository'

export class FindBuyersUseCase {
  constructor(private buyerRepository: IBuyerRepository) {}

  async execute(query?: string) {
    const buyers = await this.buyerRepository.findMany(query)

    return buyers
  }
}
