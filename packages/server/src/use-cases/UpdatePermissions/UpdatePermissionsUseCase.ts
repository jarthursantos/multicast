import { IPermissionsRepository } from 'repositories/IPermissionsRepository'

import { IUpdatePermissionsRequestDTO } from './UpdatePermissionsDTO'

export class UpdatePermissionsUseCase {
  constructor(private permissionsRepository: IPermissionsRepository) {}

  async execute(id: string, data: IUpdatePermissionsRequestDTO) {
    const permissions = await this.permissionsRepository.findById(id)

    if (!permissions) {
      throw Error('Usuário não existe')
    }

    if (data.title && data.title !== permissions.title) {
      const titleInUse = await this.permissionsRepository.findByTitle(
        data.title
      )

      if (titleInUse) {
        throw Error('Título já existe')
      }
    }

    Object.assign(permissions, data)

    const updatedPermissions = await this.permissionsRepository.update(
      permissions
    )

    return updatedPermissions
  }
}
