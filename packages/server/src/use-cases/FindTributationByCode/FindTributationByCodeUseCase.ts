import { ITributationRepository } from 'repositories/ITributationRepository'

export class FindTributationByCodeUseCase {
  constructor(private tributationRepository: ITributationRepository) {}

  async execure(code: number) {
    const tribuitation = await this.tributationRepository.findById(code)

    return tribuitation
  }
}
