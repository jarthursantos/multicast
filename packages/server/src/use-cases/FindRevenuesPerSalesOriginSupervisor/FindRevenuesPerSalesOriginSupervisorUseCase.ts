import { IRevenuesRepository } from 'repositories/IRevenuesRepository'
import { IFindRevenuesDTO } from 'utils/parse-revenues-options'

export class FindRevenuesPerSalesOriginSupervisorUseCase {
  constructor(private revenuesRepository: IRevenuesRepository) {}

  async execute(origin: string, options: IFindRevenuesDTO) {
    const salesOriginSupervisors = await this.revenuesRepository.findBySalesOriginSupervisor(
      origin,
      options
    )

    return salesOriginSupervisors
  }
}
