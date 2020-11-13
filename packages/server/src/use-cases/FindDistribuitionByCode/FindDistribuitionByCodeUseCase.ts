import { IDistribuitionRepository } from 'repositories/IDistribuitionRepository'

export class FindDistribuitionByCodeUseCase {
  constructor(private distribuitionRepository: IDistribuitionRepository) {}

  async execute(code: string) {
    const distribuition = await this.distribuitionRepository.findById(code)

    return distribuition
  }
}
