import { IScheduleRequestsRepository } from 'repositories/IScheduleRequestsRepository'

export class FindScheduleRequestsUseCase {
  constructor(private scheduleRequestRepository: IScheduleRequestsRepository) {}

  async execute() {
    const requests = this.scheduleRequestRepository.findMany()

    return requests
  }
}
