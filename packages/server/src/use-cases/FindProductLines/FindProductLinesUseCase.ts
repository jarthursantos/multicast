import { IProductLineRepository } from 'repositories/IProductLineRepository'

export class FindProductLinesUseCase {
  constructor(private productLineRepository: IProductLineRepository) {}

  async execute() {
    const lines = await this.productLineRepository.findMany()

    return lines
  }
}
