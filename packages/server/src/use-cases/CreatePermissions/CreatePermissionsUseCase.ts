import { Permissions } from 'entities/Permissions'
import { IPermissionsRepository } from 'repositories/IPermissionsRepository'

import { ICreatePermissionsRequestDTO } from './CreatePermissionsDTO'

export class CreatePermissionsUseCase {
  constructor(private permissionsRepository: IPermissionsRepository) {}

  async execute(data: ICreatePermissionsRequestDTO) {
    const { title } = data

    const titleAlreadyInUse = await this.permissionsRepository.findByTitle(
      title
    )

    if (titleAlreadyInUse) {
      throw new Error('Título já existe')
    }

    const permissions = new Permissions(data)

    await this.permissionsRepository.save(permissions)

    return permissions
  }
}
