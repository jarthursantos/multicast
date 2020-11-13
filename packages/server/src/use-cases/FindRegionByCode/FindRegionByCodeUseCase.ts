import { IRegionRepository } from 'repositories/IRegionRepository'

export class FindRegionByCodeUseCase {
  constructor(private regionRepository: IRegionRepository) {}

  async execute(code: number) {
    const region = await this.regionRepository.findById(code)

    return region
  }
}
