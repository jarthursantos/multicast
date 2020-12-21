import { createWinThorBillsToPayModel } from '~/models/bills-to-pay/WinThorBillsToPayModel'

import { createFindAllBillsToPayModule } from './find-all'

const billsToPayModel = createWinThorBillsToPayModel()

const findAllBillsToPayModule = createFindAllBillsToPayModule(billsToPayModel)

export { findAllBillsToPayModule }
export * from './find-all/parser'
