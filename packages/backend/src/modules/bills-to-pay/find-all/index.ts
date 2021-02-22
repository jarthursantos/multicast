import { IBillsToPayModel } from '~/models/bills-to-pay/IBillsToPayModel'

import { IFindBillsToPayOptions } from './parser'

export function createFindAllBillsToPayModule(
  billsToPayModel: IBillsToPayModel
) {
  return {
    async execute(options: IFindBillsToPayOptions) {
      const bills = await billsToPayModel.find(options)

      return bills
    }
  }
}
