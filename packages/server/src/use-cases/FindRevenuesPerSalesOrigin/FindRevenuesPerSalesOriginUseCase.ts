import { IRevenuesRepository } from 'repositories/IRevenuesRepository'
import { IFindRevenuesDTO } from 'utils/parse-revenues-options'

export class FindRevenuesPerSalesOriginUseCase {
  constructor(private revenuesRepository: IRevenuesRepository) {}

  async execute(options: IFindRevenuesDTO) {
    const salesOrigins = await this.revenuesRepository.findBySalesOrigin(
      options
    )

    return salesOrigins
  }
}
