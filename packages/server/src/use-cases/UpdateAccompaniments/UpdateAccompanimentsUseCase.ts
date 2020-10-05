import { Accompaniment } from 'entities/Accompaniment'
import { assign } from 'lodash'
import { IAccompanimentsRepository } from 'repositories/IAccompanimentsRepository'

import { UpdateAccompanimentsRequestDTO } from './UpdateAccompanimentsDTO'

export class UpdateAccompanimentsUseCase {
  constructor(private accompanimentsRepository: IAccompanimentsRepository) {}

  async execute(id: string, data: UpdateAccompanimentsRequestDTO) {
    const accompaniment = await this.accompanimentsRepository.findById(id)

    if (!accompaniment) {
      throw new Error('Acompanhamento não existe')
    }
    const updateData = assign(
      new Accompaniment(accompaniment, accompaniment.id),
      data
    )

    const updatedAccompaniment = await this.accompanimentsRepository.update(
      updateData
    )

    return updatedAccompaniment
  }
}
