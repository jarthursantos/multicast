import { IRevenuesRepository } from 'repositories/IRevenuesRepository'
import { IFindRevenuesDTO } from 'utils/parse-revenues-options'

export class FindRevenuesPerActuationAreaUseCase {
  constructor(private revenuesRepository: IRevenuesRepository) {}

  async execute(options: IFindRevenuesDTO) {
    const actuationAreas = await this.revenuesRepository.findByActuationArea(
      options
    )

    return actuationAreas
  }
}
