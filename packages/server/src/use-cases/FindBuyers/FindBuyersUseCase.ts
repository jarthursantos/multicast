import { IBuyerRepository } from 'repositories/IBuyerRepository'

export class FindBuyersUseCase {
  constructor(private buyerRepository: IBuyerRepository) {}

  async execute() {
    const buyers = await this.buyerRepository.findMany()

    return buyers
  }
}
