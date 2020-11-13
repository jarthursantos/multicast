import { ICategoryRepository } from 'repositories/ICategoryRepository'
import { ISectionRepository } from 'repositories/ISectionRepository'
import { ISubcategoryRepository } from 'repositories/ISubcategoryRepository'

export class FindSubcategoryByCodeUseCase {
  constructor(
    private sectionRepository: ISectionRepository,
    private categoryRepository: ICategoryRepository,
    private subcategoryRepository: ISubcategoryRepository
  ) {}

  async execute(sectionId: number, categoryId: number, id: number) {
    const section = await this.sectionRepository.findById(sectionId)

    if (!section) {
      throw new Error('Seção não existe')
    }

    const category = await this.categoryRepository.findById(section, categoryId)

    if (!category) {
      throw new Error('Categoria não existe')
    }

    const subcategory = await this.subcategoryRepository.findById(
      section,
      category,
      id
    )

    return subcategory
  }
}
