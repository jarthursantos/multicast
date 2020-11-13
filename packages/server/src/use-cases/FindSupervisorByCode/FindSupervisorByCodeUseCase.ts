import { ISupervisorRepository } from 'repositories/ISupervisorRepository'

export class FindSupervisorByCodeUseCase {
  constructor(private supervisorRepository: ISupervisorRepository) {}

  async execute(code: number) {
    const supervisor = await this.supervisorRepository.findById(code)

    return supervisor
  }
}
