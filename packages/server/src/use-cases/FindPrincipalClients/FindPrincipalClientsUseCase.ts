import { IPrincipalClientRepository } from 'repositories/IPrincipalClientRepository'

export class FindPrincipalClientsUseCase {
  constructor(private principalClientRepository: IPrincipalClientRepository) {}

  async execute() {
    const clients = await this.principalClientRepository.findMany()

    return clients
  }
}
