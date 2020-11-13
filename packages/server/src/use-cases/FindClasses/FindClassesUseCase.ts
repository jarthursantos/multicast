import { IClassRepository } from 'repositories/IClassRepository'

export class FindClassesUseCase {
  constructor(private classRepository: IClassRepository) {}

  async execute() {
    const classes = await this.classRepository.findMany()

    return classes
  }
}
