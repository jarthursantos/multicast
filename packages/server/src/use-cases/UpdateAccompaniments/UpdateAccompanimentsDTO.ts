export interface UpdateAccompanimentsRequestDTO {
  releasedAt?: Date
  expectedBillingAt?: Date
  billingAt: Date
  transactionNumber: number
  freeOnBoardAt?: Date
  schedulingAt?: Date
}
