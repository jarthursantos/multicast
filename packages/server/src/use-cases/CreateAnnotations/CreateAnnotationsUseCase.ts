import { Annotation } from 'entities/Annotation'
import { User } from 'entities/User'
import { IAccompanimentsRepository } from 'repositories/IAccompanimentsRepository'
import { IAnnotationsRepository } from 'repositories/IAnnotationsRepository'

import { CreateAnnotationsRequestDTO } from './CreateAnnotationsDTO'

export class CreateAnnotationsUseCase {
  constructor(
    private annotationsRepository: IAnnotationsRepository,
    private accompanimentsRepository: IAccompanimentsRepository
  ) {}

  async execute(
    accompanimentId: string,
    data: CreateAnnotationsRequestDTO,
    user: User
  ) {
    const accompaniment = await this.accompanimentsRepository.findById(
      accompanimentId
    )

    if (!accompaniment) {
      throw new Error('Acompanhamento não existe')
    }

    const annotation = new Annotation({
      ...data,
      user,
      userId: user.id,
      accompanimentId
    })

    await this.annotationsRepository.save(annotation)

    return annotation
  }
}
