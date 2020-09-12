import { Size, Charge } from '@prisma/client'
import { DischargeTable } from 'entities/DischargeTable'
import { Invoice } from 'entities/Invoice'
import {
  Palletized,
  Assistant
} from 'use-cases/ReceiveSchedules/ReceiveSchedulesDTO'

export interface CalculateData {
  invoice: Invoice
  dischargeTable: DischargeTable
  chargeType: Charge
  pipeSize: Size
  assistant: Assistant
  palletized: Palletized
}

export function calculateInvoiceDischarge(data: CalculateData) {
  const {
    invoice,
    dischargeTable,
    chargeType,
    palletized,
    pipeSize,
    assistant
  } = data

  const { volume, weight } = invoice
  const parsedWeight = weight / 1000

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
          return volume * dischargeTable.volumePalletizedWithAssistant
        } else {
          return volume * dischargeTable.volumePalletizedWithoutAssistant
        }
      } else {
        if (assistant === 'YES') {
          return volume * dischargeTable.volumeNonPalletizedWithAssistant
        } else {
          return volume * dischargeTable.volumeNonPalletizedWithoutAssistant
        }
      }

    default:
      return 0.0
  }
}
