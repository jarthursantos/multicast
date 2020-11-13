import { ICategoryRepository } from 'repositories/ICategoryRepository'
import { ISectionRepository } from 'repositories/ISectionRepository'

export class FindCategoryByCodeUseCase {
  constructor(
    private sectionRepository: ISectionRepository,
    private categoryRepository: ICategoryRepository
  ) {}

  async execute(sectionId: number, id: number) {
    const section = await this.sectionRepository.findById(sectionId)

    if (!section) {
      throw new Error('Seção não existe')
    }

    const category = await this.categoryRepository.findById(section, id)

    return category
  }
}
