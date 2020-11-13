import { IRevenuesRepository } from 'repositories/IRevenuesRepository'
import { IFindRevenuesDTO } from 'utils/parse-revenues-options'

export class FindRevenuesPerClassUseCase {
  constructor(private revenuesRepository: IRevenuesRepository) {}

  async execute(options: IFindRevenuesDTO) {
    const classes = await this.revenuesRepository.findByClass(options)
    const origins = await this.revenuesRepository.findByClassOrigin(options)
    const positions = await this.revenuesRepository.findByClassPosition(options)
    const sellTypes = await this.revenuesRepository.findByClassSellType(options)

    return { classes, origins, positions, sellTypes }
  }
}
