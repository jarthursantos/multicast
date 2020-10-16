import { IAccompanimentsRepository } from 'repositories/IAccompanimentsRepository'

export class MarkAccompanimentAsSendedUseCase {
  constructor(private accompanimentsRepository: IAccompanimentsRepository) {}

  async execute(id: string) {
    const accompaniment = await this.accompanimentsRepository.findById(id)

    if (!accompaniment) {
      throw new Error('Acompanhamento não axiste')
    }

    accompaniment.sendedAt = new Date()

    return await this.accompanimentsRepository.update(accompaniment)
  }
}
