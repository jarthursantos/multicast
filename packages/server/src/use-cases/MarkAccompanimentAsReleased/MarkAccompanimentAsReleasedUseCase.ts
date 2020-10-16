import { IAccompanimentsRepository } from 'repositories/IAccompanimentsRepository'

export class MarkAccompanimentAsReleasedUseCase {
  constructor(private accompanimentsRepository: IAccompanimentsRepository) {}

  async execute(id: string) {
    const accompaniment = await this.accompanimentsRepository.findById(id)

    if (!accompaniment) {
      throw new Error('Acompanhamento não axiste')
    }

    accompaniment.releasedAt = new Date()

    return await this.accompanimentsRepository.update(accompaniment)
  }
}
