import { IUsersHistoryRepository } from 'repositories/IUserHistoryRepository'
import { IUsersRepository } from 'repositories/IUserRepository'

export class FindUserChangesUseCase {
  constructor(
    private userRepository: IUsersRepository,
    private userHistoryRepository: IUsersHistoryRepository
  ) {}

  async execute(id: string) {
    const user = await this.userRepository.findById(id)

    if (!user) {
      throw new Error('Usuário não encontrado')
    }

    return this.userHistoryRepository.findHistory(user)
  }
}
