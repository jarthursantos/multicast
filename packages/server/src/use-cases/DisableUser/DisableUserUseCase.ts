import { User } from 'entities/User'
import { IUsersHistoryRepository } from 'repositories/IUserHistoryRepository'
import { IUsersRepository } from 'repositories/IUserRepository'

export class DisableUserUseCase {
  constructor(
    private userRepository: IUsersRepository,
    private userHistoryRepository: IUsersHistoryRepository
  ) {}

  async execute(authUser: User, id: string) {
    const user = await this.userRepository.findById(id)

    if (!user) {
      throw Error('Usuário não existe')
    }

    await this.userRepository.disable(user)
    await this.userHistoryRepository.logDisabled(authUser, user)
  }
}
