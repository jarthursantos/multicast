import { IProductRepository } from 'repositories/IProductsRepository'

export class FindProductByCodeUseCase {
  constructor(private productsRepository: IProductRepository) {}

  async execute(code: number) {
    const product = await this.productsRepository.findById(code)

    return product
  }
}
