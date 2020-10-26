import { IAccompanimentMailMessageProvider } from 'providers/IAccompanimentMailMessageProvider'
import { IAccompanimentsRepository } from 'repositories/IAccompanimentsRepository'

export class GenerateAccompanimentPDFUseCase {
  constructor(
    private accompanimentsRepository: IAccompanimentsRepository,
    private accompanimentMailMessageProvider: IAccompanimentMailMessageProvider
  ) {}

  async execute(id: string) {
    const accompaniment = await this.accompanimentsRepository.findById(id)

    if (!accompaniment) {
      throw new Error('Acompanhamento não existe')
    }

    const result = await this.accompanimentMailMessageProvider.generate(
      accompaniment
    )

    return result
  }
}
