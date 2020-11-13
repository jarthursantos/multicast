import { IPrincipalClientRepository } from 'repositories/IPrincipalClientRepository'

export class FindPrincipalClientByCodeUseCase {
  constructor(private principalClientRepository: IPrincipalClientRepository) {}

  async execute(code: number) {
    const client = await this.principalClientRepository.findById(code)

    console.log({ client, code })

    return client
  }
}
