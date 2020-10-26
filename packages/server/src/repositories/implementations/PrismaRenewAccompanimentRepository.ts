import { PrismaClient } from '@prisma/client'
import { Accompaniment } from 'entities/Accompaniment'
import { CriticalLevel } from 'entities/CriticalLevel'
import { RenewAccompanimentResult } from 'entities/RenewAccompanimentResult'
import { assign } from 'lodash'
import { IAccompanimentsRepository } from 'repositories/IAccompanimentsRepository'
import { IRenewAccompanimentRepository } from 'repositories/IRenewAccompanimentRepository'

export class PrismaRenewAccompanimentRepository
  implements IRenewAccompanimentRepository {
  private prisma = new PrismaClient()

  constructor(private accompanimentsRepository: IAccompanimentsRepository) {}

  async renew(accompaniment: Accompaniment): Promise<RenewAccompanimentResult> {
    const { purchaseOrder } = accompaniment

    const renewedData = new Accompaniment({
      ...purchaseOrder,
      purchaseOrder,
      annotations: [],
      isOutstanding: true,
      criticalLevel: CriticalLevel.NORMAL,
      delay: accompaniment.delay
    })

    await this.accompanimentsRepository.save(renewedData)

    const updateRenewedData = assign(renewedData, {
      sendedAt: accompaniment.sendedAt,
      reviewedAt: accompaniment.reviewedAt,
      releasedAt: accompaniment.releasedAt
    })

    const renewedAccompaniment = await this.accompanimentsRepository.update(
      updateRenewedData
    )

    renewedAccompaniment.isOutstanding = true

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
