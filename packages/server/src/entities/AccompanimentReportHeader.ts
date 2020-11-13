export interface AccompanimentReportHeader {
  number: number
  emittedAt: Date | string
  billingAt: Date | string
  boardingAt: Date | string
  expectedDeliveryAt: Date | string
  freight: string
  observationNumber1: string
  observationNumber2: string
  observationNumber3: string
  observationNumber4: string
  observationNumber5: string
  observationNumber6: string
  observationNumber7: string
  providerCode: number
  providerName: string
  providerCNPJ: string
  providerPhone: string
  providerAddress: string
  providerCity: string
  providerCEP: string
  providerNeighborhood: string
  providerState: string
  buyerName: string
  buyerCNPJ: string
  buyerAddress: string
  buyerNumber: string
  buyerCity: string
  buyerUF: string
  buyerIE: string
  buyerCEP: string
}
