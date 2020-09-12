import { pick } from 'lodash'
import { v4 as uuid } from 'uuid'

export class DischargeTable {
  public readonly id: string

  public smallPipe: number
  public mediumPipe: number
  public largePipe: number

  public beatPalletizedWithAssistant: number
  public beatPalletizedWithoutAssistant: number
  public beatNonPalletizedWithAssistant: number
  public beatNonPalletizedWithoutAssistant: number

  public volumePalletizedWithAssistant: number
  public volumePalletizedWithoutAssistant: number
  public volumeNonPalletizedWithAssistant: number
  public volumeNonPalletizedWithoutAssistant: number

  public createdAt?: Date

  constructor(data: Omit<DischargeTable, 'id'>, id?: string) {
    Object.assign(
      this,
      pick(
        data,
        'smallPipe',
        'mediumPipe',
        'largePipe',

        'beatPalletizedWithAssistant',
        'beatPalletizedWithoutAssistant',
        'beatNonPalletizedWithAssistant',
        'beatNonPalletizedWithoutAssistant',

        'volumePalletizedWithAssistant',
        'volumePalletizedWithoutAssistant',
        'volumeNonPalletizedWithAssistant',
        'volumeNonPalletizedWithoutAssistant',

        'createdAt'
      )
    )

    this.id = id || uuid()

    this.createdAt = this.createdAt || new Date()
  }
}
