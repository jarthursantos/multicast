import { ISectionRepository } from 'repositories/ISectionRepository'

export class FindSectionByCodeUseCase {
  constructor(private sectionRepository: ISectionRepository) {}

  async execute(code: number) {
    const section = await this.sectionRepository.findById(code)

    return section
  }
}
