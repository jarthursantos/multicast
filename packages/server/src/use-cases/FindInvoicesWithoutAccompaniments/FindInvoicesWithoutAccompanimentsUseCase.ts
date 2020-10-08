import { IAccompanimentsRepository } from 'repositories/IAccompanimentsRepository'
import { IInvoicesWithoutAccompanimentsRepository } from 'repositories/IInvoicesWithoutAccompanimentsRepository'

export class FindInvoicesWithoutAccompanimentsUseCase {
  constructor(
    private accompanimentsRepository: IAccompanimentsRepository,
    private invoicesWithoutAccompanimentsRepository: IInvoicesWithoutAccompanimentsRepository
  ) {}

  async execute(id: string) {
    const accompaniment = await this.accompanimentsRepository.findById(id)

    if (!accompaniment) {
      throw new Error('Agendamento não existe')
    }

    const result = await this.invoicesWithoutAccompanimentsRepository.findMany(
      accompaniment
    )

    return result
  }
}
