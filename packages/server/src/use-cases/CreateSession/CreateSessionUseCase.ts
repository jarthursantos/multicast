import { secret } from 'configs/auth'
import jwt from 'jsonwebtoken'
import { IUsersRepository } from 'repositories/IUserRepository'

export class CreateSessionUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email.toLowerCase())

    if (!user) {
      throw new Error('Usuário não encontrado')
    }

    if (user.password !== password) {
      throw new Error('Senha inválida')
    }

    if (user.disabledAt) {
      throw new Error('Usuário desativado')
    }

    return { user, token: jwt.sign({ id: user.id }, secret) }
  }
}
