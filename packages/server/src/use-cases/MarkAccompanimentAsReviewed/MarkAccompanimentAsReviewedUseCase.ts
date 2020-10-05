import { IAccompanimentsRepository } from 'repositories/IAccompanimentsRepository'

export class MarkAccompanimentAsReviewedUseCase {
  constructor(private accompanimentsRepository: IAccompanimentsRepository) {}

  async execute(id: string) {
    const accompaniment = await this.accompanimentsRepository.findById(id)

    if (!accompaniment) {
      throw new Error('Acompanhamento não axiste')
    }

    accompaniment.reviewedAt = new Date()

    await this.accompanimentsRepository.update(accompaniment)

    return accompaniment
  }
}
