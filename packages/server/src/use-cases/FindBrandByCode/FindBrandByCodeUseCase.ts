import { IBrandRepository } from 'repositories/IBrandsRepository'

export class FindBrandByCodeUseCase {
  constructor(private brandsRepository: IBrandRepository) {}

  async execute(code: number) {
    const brand = await this.brandsRepository.findById(code)

    return brand
  }
}
