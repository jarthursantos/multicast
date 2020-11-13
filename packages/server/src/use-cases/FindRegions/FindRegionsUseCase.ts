import { IRegionRepository } from 'repositories/IRegionRepository'

export class FindRegionsUseCase {
  constructor(private regionRepository: IRegionRepository) {}

  async execute() {
    const regions = await this.regionRepository.findMany()

    return regions
  }
}
