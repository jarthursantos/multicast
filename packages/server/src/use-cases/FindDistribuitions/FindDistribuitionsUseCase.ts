import { IDistribuitionRepository } from 'repositories/IDistribuitionRepository'

export class FindDistribuitionsUseCase {
  constructor(private distribuitionRepository: IDistribuitionRepository) {}

  async execute() {
    const distribuition = await this.distribuitionRepository.findMany()

    return distribuition
  }
}
