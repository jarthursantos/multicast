import { IBuyerRepository } from 'repositories/IBuyerRepository'

export class FindBuyerByCodeUseCase {
  constructor(private buyersRepository: IBuyerRepository) {}

  async handle(code: number) {
    const buyer = await this.buyersRepository.findById(code)

    return buyer
  }
}
