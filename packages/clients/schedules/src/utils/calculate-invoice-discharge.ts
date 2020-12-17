import { Size, Charge } from '@prisma/client'

import { IInvoice, IDischargeTable } from '~/store/modules/schedules/types'

export interface ICalculateData {
  invoice: IInvoice
  dischargeTable: IDischargeTable
  chargeType: Charge
  pipeSize: Size
  assistant: boolean
  palletized: boolean
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
      if (palletized) {
        if (assistant) {
          return parsedWeight * dischargeTable.beatPalletizedWithAssistant
        } else {
          return parsedWeight * dischargeTable.beatPalletizedWithoutAssistant
        }
      } else {
        if (assistant) {
          return parsedWeight * dischargeTable.beatNonPalletizedWithAssistant
        } else {
          return parsedWeight * dischargeTable.beatNonPalletizedWithoutAssistant
        }
      }

    case 'VOLUME':
      if (palletized) {
        if (assistant) {
          return (volume || 0) * dischargeTable.volumePalletizedWithAssistant
        } else {
          return (volume || 0) * dischargeTable.volumePalletizedWithoutAssistant
        }
      } else {
        if (assistant) {
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
