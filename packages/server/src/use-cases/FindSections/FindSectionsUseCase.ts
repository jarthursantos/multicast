import { ISectionRepository } from 'repositories/ISectionRepository'

export class FindSectionsUseCase {
  constructor(private sectionRepository: ISectionRepository) {}

  async execute() {
    const sections = await this.sectionRepository.findMany()

    return sections
  }
}
