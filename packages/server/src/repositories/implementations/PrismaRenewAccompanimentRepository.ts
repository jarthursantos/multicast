import { PrismaClient } from '@prisma/client'
import { Accompaniment } from 'entities/Accompaniment'
import { RenewAccompanimentResult } from 'entities/RenewAccompanimentResult'
import { IAccompanimentsRepository } from 'repositories/IAccompanimentsRepository'
import { IRenewAccompanimentRepository } from 'repositories/IRenewAccompanimentRepository'

export class PrismaRenewAccompanimentRepository
  implements IRenewAccompanimentRepository {
  private prisma = new PrismaClient()

  constructor(private accompanimentsRepository: IAccompanimentsRepository) {}

  async renew(accompaniment: Accompaniment): Promise<RenewAccompanimentResult> {
    const renewedAccompaniment = new Accompaniment({
      ...accompaniment.purchaseOrder,
      sendedAt: accompaniment.sendedAt,
      reviewedAt: accompaniment.reviewedAt,
      releasedAt: accompaniment.releasedAt,
      valueDelivered:
        accompaniment.valueDelivered + accompaniment.invoice.value,
      purchaseOrder: accompaniment.purchaseOrder,
      annotations: []
    })

    await this.accompanimentsRepository.save(renewedAccompaniment)

    accompaniment.renewedAt = new Date()

    await this.prisma.accompaniments.update({
      where: { id: accompaniment.id },
      data: {
        renewedTo: { connect: { id: renewedAccompaniment.id } },
        renewedAt: accompaniment.renewedAt
      }
    })

    await this.prisma.accompaniments.update({
      where: { id: renewedAccompaniment.id },
      data: { renewedFrom: { connect: { id: accompaniment.id } } }
    })

    return { accompaniment, renewedAccompaniment }
  }
}
