import { Accompaniment } from 'entities/Accompaniment'
import { RenewAccompanimentResult } from 'entities/RenewAccompanimentResult'
import { IAccompanimentsRepository } from 'repositories/IAccompanimentsRepository'
import { IRenewAccompanimentRepository } from 'repositories/IRenewAccompanimentRepository'

export class PrismaRenewAccompanimentRepository
  implements IRenewAccompanimentRepository {
  constructor(private accompanimentsRepository: IAccompanimentsRepository) {}

  async renew(renewed: Accompaniment): Promise<RenewAccompanimentResult> {
    renewed.renewedAt = new Date()

    const accompaniment = await this.accompanimentsRepository.update(renewed)

    const renewedAccompaniment = new Accompaniment({
      ...renewed.purchaseOrder,
      valueDelivered: renewed.valueDelivered + renewed.invoice.value,
      purchaseOrder: renewed.purchaseOrder,
      annotations: []
    })

    await this.accompanimentsRepository.save(renewedAccompaniment)

    return { accompaniment, renewedAccompaniment }
  }
}
