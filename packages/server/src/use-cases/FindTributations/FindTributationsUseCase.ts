import { ITributationRepository } from 'repositories/ITributationRepository'

export class FindTributationsUseCase {
  constructor(private tributationRepository: ITributationRepository) {}

  async execute() {
    const tribuitations = await this.tributationRepository.findMany()

    return tribuitations
  }
}
