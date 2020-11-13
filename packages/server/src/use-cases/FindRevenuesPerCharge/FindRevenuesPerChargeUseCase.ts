import { IRevenuesRepository } from 'repositories/IRevenuesRepository'
import { IFindRevenuesDTO } from 'utils/parse-revenues-options'

export class FindRevenuesPerChargeUseCase {
  constructor(private revenuesRepository: IRevenuesRepository) {}

  async execute(options: IFindRevenuesDTO) {
    const charges = await this.revenuesRepository.findByCharge(options)

    return charges
  }
}
