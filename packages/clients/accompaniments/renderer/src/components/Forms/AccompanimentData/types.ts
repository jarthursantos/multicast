export interface AccompanimentDataProps {
  disabled: boolean
  isFreeOnBoard: boolean
  options?: OptionData[]
}

export interface OptionData {
  value: string
  label: string
}
