import { IAccompanimentsModel } from '~/models/accompaniments/IAccompanimentsModel'
import { IPurchaseOrderModel } from '~/models/purchase-orders/IPurchaseOrderModel'

export function createFindAllAccompanimentsModule(
  accompanimentsModel: IAccompanimentsModel,
  purchaseOrdersModel: IPurchaseOrderModel
) {
  return {
    async execute() {
      const purchases = await purchaseOrdersModel.findAllUnregistered()

      await accompanimentsModel.registerPurchaseOrders(purchases)

      const accompaniments = await accompanimentsModel.findMany()

      return accompaniments
    }
  }
}
