import { ISchedulesRepository } from 'repositories/ISchedulesRepository'

export class FindSchedulesUseCase {
  constructor(private schedulesRepository: ISchedulesRepository) {}

  async execute() {
    const schedules = await this.schedulesRepository.findMany()

    return schedules
  }
}
