import { ISupervisorRepository } from 'repositories/ISupervisorRepository'

export class FindSupervisorsUseCase {
  constructor(private supervisorRepository: ISupervisorRepository) {}

  async execute() {
    const supervisors = await this.supervisorRepository.findMany()

    return supervisors
  }
}
