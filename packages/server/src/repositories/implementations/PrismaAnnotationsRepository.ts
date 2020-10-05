import { PrismaClient } from '@prisma/client'
import { Annotation } from 'entities/Annotation'
import { IAnnotationsRepository } from 'repositories/IAnnotationsRepository'
import { IUsersRepository } from 'repositories/IUserRepository'

export class PrismaAnnotationsRepository implements IAnnotationsRepository {
  private prisma = new PrismaClient()

  constructor(private userRepository: IUsersRepository) {}

  async save(annotation: Annotation): Promise<void> {
    const { id, content, accompanimentId, userId } = annotation

    await this.prisma.accompanimentAnnotations.create({
      data: {
        id,
        content,
        accompaniment: { connect: { id: accompanimentId } },
        user: { connect: { id: userId } }
      }
    })
  }

  async findFromAccompaniment(id: string): Promise<Annotation[]> {
    const result: Annotation[] = []

    const annotations = await this.prisma.accompanimentAnnotations.findMany({
      where: { accompanimentId: id }
    })

    for (let i = 0; i < annotations.length; i++) {
      const annotation = annotations[i]

      const user = await this.userRepository.findById(annotation.userId)

      result.push(new Annotation({ ...annotation, user }, annotation.id))
    }

    return result
  }
}
