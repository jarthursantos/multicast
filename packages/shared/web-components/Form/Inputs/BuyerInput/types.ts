export interface IBuyerInputProps {
  name: string
  label: string
  disabled?: boolean
  single?: boolean
  onBuyersChange?(buyers: IBuyer[]): void
}

export interface IBuyer {
  code: number
  name: string
}
