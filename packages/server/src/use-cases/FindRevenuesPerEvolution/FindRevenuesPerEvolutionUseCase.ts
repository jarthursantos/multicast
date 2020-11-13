import { IRevenuesRepository } from 'repositories/IRevenuesRepository'
import { IFindRevenuesDTO } from 'utils/parse-revenues-options'

export class FindRevenuesPerEvolutionUseCase {
  constructor(private revenuesRepository: IRevenuesRepository) {}

  async execute(options: IFindRevenuesDTO) {
    const evolutions = await this.revenuesRepository.findByEvolution(options)

    return evolutions
  }
}
