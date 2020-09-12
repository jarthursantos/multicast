import { User } from 'entities/User'
import { IUsersHistoryRepository } from 'repositories/IUserHistoryRepository'
import { IUsersRepository } from 'repositories/IUserRepository'

export class EnableUserUseCase {
  constructor(
    private userRepository: IUsersRepository,
    private userHistoryRepository: IUsersHistoryRepository
  ) {}

  async execute(authUser: User, id: string) {
    const user = await this.userRepository.findById(id)

    if (!user) {
      throw Error('Usuário não existe')
    }

    await this.userRepository.enable(user)
    await this.userHistoryRepository.logEnabled(authUser, user)
  }
}
