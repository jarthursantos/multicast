import { ICategoryRepository } from 'repositories/ICategoryRepository'
import { ISectionRepository } from 'repositories/ISectionRepository'

export class FindCategoriesUseCase {
  constructor(
    private sectionRepository: ISectionRepository,
    private categoryRepository: ICategoryRepository
  ) {}

  async execute(sectionId: number) {
    const section = await this.sectionRepository.findById(sectionId)

    if (!section) {
      throw new Error('Seção não existe')
    }

    const categories = await this.categoryRepository.findMany(section)

    return categories
  }
}
