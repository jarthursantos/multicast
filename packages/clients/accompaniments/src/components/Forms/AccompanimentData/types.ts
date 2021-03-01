export interface AccompanimentDataProps {
  disabled: boolean
  isFreeOnBoard: boolean
  options?: OptionData[]
  scheduled?: boolean
}

export interface OptionData {
  value: string | number
  label: string
}
