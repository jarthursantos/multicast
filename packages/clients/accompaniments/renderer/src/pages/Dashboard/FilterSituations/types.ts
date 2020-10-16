export interface FilterSituationsProps {
  onChange(data: FilterSituationsData): void
}

export interface FilterSituationsData {
  nonSended: boolean
  nonRevised: boolean
  nonReleased: boolean
  nonExpectedBilling: boolean
  nonBilled: boolean
  nonFreeOnBoard: boolean
  nonScheduling: boolean
  nonScheduled: boolean
}
