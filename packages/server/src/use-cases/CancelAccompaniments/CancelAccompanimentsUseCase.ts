import { User } from 'entities/User'
import { IAccompanimentsRepository } from 'repositories/IAccompanimentsRepository'

import { CancelAccompanimentsRequestDTO } from './CancelAccompanimentsDTO'

export class CancelAccompanimentsUseCase {
  constructor(private accompanimentsRepository: IAccompanimentsRepository) {}

  async execute(id: string, data: CancelAccompanimentsRequestDTO, user: User) {
    const accompaniment = await this.accompanimentsRepository.findById(id)

    if (!accompaniment) {
      throw new Error('Acompanhamento não existe')
    }

    await this.accompanimentsRepository.cancel(accompaniment, data, user)
  }
}
