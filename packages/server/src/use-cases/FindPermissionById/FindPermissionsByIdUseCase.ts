import { IPermissionsRepository } from 'repositories/IPermissionsRepository'

export class FindPermissionsByIdUseCase {
  constructor(private permissionsRepository: IPermissionsRepository) {}

  async execute(id: string) {
    const permissions = this.permissionsRepository.findById(id)

    if (!permissions) {
      throw new Error('Permissões não existem')
    }

    return permissions
  }
}
