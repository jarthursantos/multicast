import { User } from 'entities/User'
import { IUsersHistoryRepository } from 'repositories/IUserHistoryRepository'
import { IUsersRepository } from 'repositories/IUserRepository'

import { ICreateUserRequestDTO } from './CreateUserDTO'

export class CreateUserUseCase {
  constructor(
    private userRepository: IUsersRepository,
    private userHistoryRepository: IUsersHistoryRepository
  ) {}

  async execute(authUser: User, data: ICreateUserRequestDTO) {
    const { email } = data

    const emailAlreadyInUse = await this.userRepository.findByEmail(
      email.toLowerCase()
    )

    if (emailAlreadyInUse) {
      throw new Error('Email já existe')
    }

    const user = new User({ ...data, email: data.email.toLowerCase() })

    await this.userRepository.save(user)
    await this.userHistoryRepository.logStore(authUser, user)

    return user
  }
}
