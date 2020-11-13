import { IClientsRepository } from 'repositories/IClientsRepository'

export class FindClientByCodeUseCase {
  constructor(private clientsRepository: IClientsRepository) {}

  async execute(code: number) {
    const client = await this.clientsRepository.findById(code)

    return client
  }
}
