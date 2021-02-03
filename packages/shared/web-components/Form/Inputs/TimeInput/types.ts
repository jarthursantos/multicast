export interface ITimeInputProps {
  name: string
  label: string
  disabled?: boolean
  minHour?: number
  maxHour?: number
  minutesStep?: number
  onHourChange?(time: ITime): void
}

export interface ITime {
  hour: number
  minute: number
}
