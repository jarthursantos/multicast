export interface IUpdateAccompanimentsDTO {
  releasedAt?: Date
  expectedBillingAt?: Date
  billingAt: Date
  transactionNumber: number
  freeOnBoardAt?: Date
  schedulingAt?: Date
}
