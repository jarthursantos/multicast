import { IScheduleRequestsRepository } from 'repositories/IScheduleRequestsRepository'

export class RemoveScheduleRequestsUseCase {
  constructor(
    private scheduleRequestsRepository: IScheduleRequestsRepository
  ) {}

  async execute(requestId: string) {
    const request = await this.scheduleRequestsRepository.findById(requestId)

    if (!request) {
      throw new Error('Pré Agendamento não existe')
    }

    await this.scheduleRequestsRepository.remove(requestId)
  }
}
