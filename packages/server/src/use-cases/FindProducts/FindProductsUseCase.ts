import { IProductRepository } from 'repositories/IProductsRepository'

export class FindProductsUseCase {
  constructor(private productsRepository: IProductRepository) {}

  async execute() {
    const products = await this.productsRepository.findMany()

    return products
  }
}
