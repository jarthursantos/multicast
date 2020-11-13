import { IRCARepository } from 'repositories/IRCARepository'

export class FindRCAByCodeUseCase {
  constructor(private rcaRepository: IRCARepository) {}

  async execute(code: number) {
    const rca = await this.rcaRepository.findById(code)

    return rca
  }
}
