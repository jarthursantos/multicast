import { IRepresentativeRepository } from 'repositories/IRepresentativeRepository'

export class FindRepresentativesUseCase {
  constructor(private representativesRepository: IRepresentativeRepository) {}

  async execute() {
    const representatives = await this.representativesRepository.findMany()

    return representatives
  }
}
