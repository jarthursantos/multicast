import { IUsersRepository } from 'repositories/IUserRepository'

export class FindUsersUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute() {
    const users = await this.userRepository.findMany()

    return users
  }
}
