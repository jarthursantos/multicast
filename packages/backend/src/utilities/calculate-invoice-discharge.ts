import { Size, Charge } from '@prisma/client'

import { IDischargeTable } from '~/domain/IDischargeTable'
import { IInvoice } from '~/domain/IInvoice'

export type Assistant = 'YES' | 'NO'
export type Palletized = 'YES' | 'NO'

export interface ICalculateData {
  invoice: IInvoice
  dischargeTable: IDischargeTable
  chargeType: Charge
  pipeSize: Size
  assistant: Assistant
  palletized: Palletized
}

export function calculateInvoiceDischarge(data: ICalculateData) {
  const {
    invoice,
    dischargeTable,
    chargeType,
    palletized,
    pipeSize,
    assistant
  } = data

  const { volume, weight } = invoice
  const parsedWeight = (weight || 0) / 1000

  switch (chargeType) {
    case 'PIPE':
      switch (pipeSize) {
        case 'SMALL':
          return dischargeTable.smallPipe
        case 'MEDIUM':
          return dischargeTable.mediumPipe
        case 'LARGE':
          return dischargeTable.largePipe
        default:
          return 0.0
      }

    case 'BEAT':
      if (palletized === 'YES') {
        if (assistant === 'YES') {
          return parsedWeight * dischargeTable.beatPalletizedWithAssistant
        } else {
          return parsedWeight * dischargeTable.beatPalletizedWithoutAssistant
        }
      } else {
        if (assistant === 'YES') {
          return parsedWeight * dischargeTable.beatNonPalletizedWithAssistant
        } else {
          return parsedWeight * dischargeTable.beatNonPalletizedWithoutAssistant
        }
      }

    case 'VOLUME':
      if (palletized === 'YES') {
        if (assistant === 'YES') {
          return (volume || 0) * dischargeTable.volumePalletizedWithAssistant
        } else {
          return (volume || 0) * dischargeTable.volumePalletizedWithoutAssistant
        }
      } else {
        if (assistant === 'YES') {
          return (volume || 0) * dischargeTable.volumeNonPalletizedWithAssistant
        } else {
          return (
            (volume || 0) * dischargeTable.volumeNonPalletizedWithoutAssistant
          )
        }
      }

    default:
      return 0.0
  }
}
