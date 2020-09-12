import { User } from 'entities/User'
import { assign } from 'lodash'
import { IUsersHistoryRepository } from 'repositories/IUserHistoryRepository'
import { IUsersRepository } from 'repositories/IUserRepository'

import { IUpdateUserRequestDTO } from './UpdateUserDTO'

export class UpdateUserUseCase {
  constructor(
    private userRepository: IUsersRepository,
    private userHistoryRepository: IUsersHistoryRepository
  ) {}

  async execute(authUser: User, id: string, data: IUpdateUserRequestDTO) {
    const user = await this.userRepository.findById(id)

    if (!user) {
      throw Error('Usuário não existe')
    }

    if (data.email && data.email !== user.email) {
      const emailInUse = await this.userRepository.findByEmail(data.email)

      if (emailInUse) {
        throw Error('Email já existe')
      }
    }

    const updateData = assign(
      new User({ ...user, email: user.email.toLowerCase() }, user.id),
      data
    )

    const updatedUser = await this.userRepository.update(updateData)
    await this.userHistoryRepository.logUpdate(authUser, user, updatedUser)

    return updatedUser
  }
}
