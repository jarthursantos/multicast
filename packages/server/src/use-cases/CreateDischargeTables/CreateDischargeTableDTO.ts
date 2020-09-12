export interface CreateDischargeTableRequestDTO {
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
}
