import { IBrandRepository } from 'repositories/IBrandsRepository'

export class FindBrandsUseCase {
  constructor(private brandsRepository: IBrandRepository) {}

  async execute() {
    const brands = await this.brandsRepository.findMany()

    return brands
  }
}
