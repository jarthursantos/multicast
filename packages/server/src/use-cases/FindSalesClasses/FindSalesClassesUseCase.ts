import { ISalesClassRepository } from 'repositories/ISalesClassRepository'

export class FindSalesClassesUseCase {
  constructor(private salesClassRepository: ISalesClassRepository) {}

  async execute() {
    const classes = await this.salesClassRepository.findMany()

    return classes
  }
}
