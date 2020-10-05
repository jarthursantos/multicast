import { IAccompanimentsRepository } from 'repositories/IAccompanimentsRepository'

export class FindAccompanimentByIdUseCase {
  constructor(private accompanimentsRepository: IAccompanimentsRepository) {}

  async execute(id: string) {
    const accompaniment = await this.accompanimentsRepository.findById(id)

    if (!accompaniment) {
      throw new Error('Acompanhamento não axiste')
    }

    return accompaniment
  }
}
