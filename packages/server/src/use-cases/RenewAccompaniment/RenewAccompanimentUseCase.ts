import { IAccompanimentsRepository } from 'repositories/IAccompanimentsRepository'
import { IRenewAccompanimentRepository } from 'repositories/IRenewAccompanimentRepository'

export class RenewAccompanimentUseCase {
  constructor(
    private accompanimentRepository: IAccompanimentsRepository,
    private renewAccompanimentRepository: IRenewAccompanimentRepository
  ) {}

  async execute(id: string) {
    const accompaniment = await this.accompanimentRepository.findById(id)

    if (!accompaniment) {
      throw new Error('Acompanhamento não existe')
    }

    if (accompaniment.renewedAt) {
      throw new Error('Acompanhamento já renovado')
    }

    if (!accompaniment.transactionNumber) {
      throw new Error('Acompanhamento não possuí nota fiscal')
    }

    const renewed = await this.renewAccompanimentRepository.renew(accompaniment)

    return renewed
  }
}
