import { IProductLineRepository } from 'repositories/IProductLineRepository'

export class FindProductLineByCodeUseCase {
  constructor(private productLineRepository: IProductLineRepository) {}

  async execute(code: number) {
    const line = await this.productLineRepository.findById(code)

    return line
  }
}
