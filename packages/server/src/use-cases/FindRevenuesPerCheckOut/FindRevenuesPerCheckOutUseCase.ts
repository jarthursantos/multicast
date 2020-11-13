import { IRevenuesRepository } from 'repositories/IRevenuesRepository'
import { IFindRevenuesDTO } from 'utils/parse-revenues-options'

export class FindRevenuesPerCheckOutUseCase {
  constructor(private revenuesRepository: IRevenuesRepository) {}

  async execute(options: IFindRevenuesDTO) {
    const checkOuts = await this.revenuesRepository.findByCheckOut(options)

    return checkOuts
  }
}
