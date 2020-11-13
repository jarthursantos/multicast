import { IRevenuesRepository } from 'repositories/IRevenuesRepository'
import { IFindRevenuesDTO } from 'utils/parse-revenues-options'

export class FindRevenuesPerSalesOriginEmitterUseCase {
  constructor(private revenuesRepository: IRevenuesRepository) {}

  async execute(origin: string, options: IFindRevenuesDTO) {
    const salesOriginEmitters = await this.revenuesRepository.findBySalesOriginEmitter(
      origin,
      options
    )

    return salesOriginEmitters
  }
}
