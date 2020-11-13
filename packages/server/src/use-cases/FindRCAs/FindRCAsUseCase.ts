import { IRCARepository } from 'repositories/IRCARepository'

export class FindRCAsUseCase {
  constructor(private rcaRepository: IRCARepository) {}

  async execute() {
    const rcas = await this.rcaRepository.findMany()

    return rcas
  }
}
