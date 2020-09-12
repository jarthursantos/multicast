// import { pick } from 'lodash'

export enum InvoiceSituations {
  INVOICE_NON_LAUNCHED = 'INVOICE_NON_LAUNCHED',
  INVOICE_PRE_LAUNCHED = 'INVOICE_PRE_LAUNCHED',
  INVOICE_LAUNCHED = 'INVOICE_LAUNCHED',
  BONUS_LAUNCHED = 'BONUS_LAUNCHED',
  BONUS_FINISHED = 'BONUS_FINISHED',
  OS_GENERATED = 'OS_GENERATED',
  OS_FINISHED = 'OS_FINISHED',
  CANCELED = 'CANCELED'
}

// export class InvoiceSituations {
//   public launch: string
//   public bonus: string
//   public os: string

//   constructor(props: InvoiceSituations) {
//     Object.assign(this, pick(props, 'launch', 'bonus', 'os'))
//   }
// }
