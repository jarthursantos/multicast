import { IClientWebsRepository } from 'repositories/IClientWebsRepository'

export class FindClientWebByCodeUseCase {
  constructor(private clientWebRepository: IClientWebsRepository) {}

  async execute(code: number) {
    const webs = await this.clientWebRepository.findById(code)

    return webs
  }
}
