import { v4 as uuid } from 'uuid'

export interface IDischargeTable {
  readonly id: string

  smallPipe: number
  mediumPipe: number
  largePipe: number

  beatPalletizedWithAssistant: number
  beatPalletizedWithoutAssistant: number
  beatNonPalletizedWithAssistant: number
  beatNonPalletizedWithoutAssistant: number

  volumePalletizedWithAssistant: number
  volumePalletizedWithoutAssistant: number
  volumeNonPalletizedWithAssistant: number
  volumeNonPalletizedWithoutAssistant: number

  createdAt?: Date
}

export function createDischargeTable(
  props: Omit<IDischargeTable, 'id'>,
  id?: string
): IDischargeTable {
  return {
    beatNonPalletizedWithAssistant: props.beatNonPalletizedWithAssistant,
    beatNonPalletizedWithoutAssistant: props.beatNonPalletizedWithoutAssistant,
    beatPalletizedWithAssistant: props.beatPalletizedWithAssistant,
    beatPalletizedWithoutAssistant: props.beatPalletizedWithoutAssistant,
    largePipe: props.largePipe,
    mediumPipe: props.mediumPipe,
    smallPipe: props.smallPipe,
    volumeNonPalletizedWithAssistant: props.volumeNonPalletizedWithAssistant,
    volumeNonPalletizedWithoutAssistant:
      props.volumeNonPalletizedWithoutAssistant,
    volumePalletizedWithAssistant: props.volumePalletizedWithAssistant,
    volumePalletizedWithoutAssistant: props.volumePalletizedWithoutAssistant,
    id: id || uuid(),

    createdAt: props.createdAt || new Date()
  }
}
