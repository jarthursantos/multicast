import { IPermissionsRepository } from 'repositories/IPermissionsRepository'

export class FindPermissionsUseCase {
  constructor(private permissionsRepository: IPermissionsRepository) {}

  async execute() {
    const permissions = await this.permissionsRepository.findMany()

    return permissions
  }
}
