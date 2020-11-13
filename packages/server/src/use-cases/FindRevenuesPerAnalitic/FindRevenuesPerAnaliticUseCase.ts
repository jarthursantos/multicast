import { IRevenuesRepository } from 'repositories/IRevenuesRepository'
import { IFindRevenuesDTO } from 'utils/parse-revenues-options'

export class FindRevenuesPerAnaliticUseCase {
  constructor(private revenuesRepository: IRevenuesRepository) {}

  async execute(options: IFindRevenuesDTO) {
    const analitics = await this.revenuesRepository.findByAnalitic(options)

    return analitics
  }
}
