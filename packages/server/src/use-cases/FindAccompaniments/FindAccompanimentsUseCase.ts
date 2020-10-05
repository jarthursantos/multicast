import { IAccompanimentsRepository } from 'repositories/IAccompanimentsRepository'
import { IPurchaseOrderRepository } from 'repositories/IPurchaseOrderRepository'

export class FindAccompanimentsUseCase {
  constructor(
    private purchaseOrdersRepository: IPurchaseOrderRepository,
    private accompanimentsRepository: IAccompanimentsRepository
  ) {}

  async execute() {
    const purchases = await this.purchaseOrdersRepository.findAllUnregistered()

    await this.accompanimentsRepository.registerPurchaseOrders(purchases)

    const accompaniments = await this.accompanimentsRepository.findMany()

    return accompaniments
  }
}
