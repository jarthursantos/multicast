import { IClientWebsRepository } from 'repositories/IClientWebsRepository'

export class FindClientWebsUseCase {
  constructor(private clientesWebRepository: IClientWebsRepository) {}

  async execute() {
    const webs = await this.clientesWebRepository.findMany()

    return webs
  }
}
