import { IClientsRepository } from 'repositories/IClientsRepository'

export class FindClientsUseCase {
  constructor(private clientsRepository: IClientsRepository) {}

  async execute() {
    const clients = await this.clientsRepository.findMany()

    return clients
  }
}
