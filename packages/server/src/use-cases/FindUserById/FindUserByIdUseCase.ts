import { IUsersRepository } from 'repositories/IUserRepository'

export class FindUserByIdUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute(id: string) {
    const user = this.userRepository.findById(id)

    if (!user) {
      throw new Error('Usuário não existe')
    }

    return user
  }
}
