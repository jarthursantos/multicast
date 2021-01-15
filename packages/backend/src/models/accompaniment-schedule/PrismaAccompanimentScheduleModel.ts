import { PrismaClient } from '@prisma/client'
import createHttpError from 'http-errors'

import {
  createAccompanimentSchedule,
  IAccompanimentSchedule
} from '~/domain/IAccompanimentSchedule'
import { IProvider } from '~/domain/IProvider'
import { winthor } from '~/libraries/WinThor'

import { IProvidersModel } from '../providers/IProvidersModel'
import {
  IAccompanimentScheduleModel,
  IAccompanimentScheduleOptions
} from './IAccompanimentScheduleModel'

export function createPrismaAccompanimentScheduleModel(
  providersModel: IProvidersModel
): IAccompanimentScheduleModel {
  const prisma = new PrismaClient()

  async function findByProviders(
    invoiceNumber: number,
    providers: IProvider[]
  ): Promise<IAccompanimentSchedule | undefined> {
    const schedules = await prisma.schedules.findMany({
      select: {
        shippingName: true,
        scheduledAt: true,
        closedAt: true,
        receivedAt: true,
        invoices: {
          select: {
            providerCode: true
          }
        }
      },
      where: {
        canceledAt: null,
        rescheduledAt: null,
        invoices: {
          some: {
            number: invoiceNumber,
            providerCode: { in: providers.map(({ code }) => code) }
          }
        }
      }
    })

    if (schedules.length !== 1) {
      return undefined
    }

    const schedule = schedules[0]

    if (!schedule.scheduledAt || !schedule.shippingName) {
      return undefined
    }

    let downloadedAt: Date | undefined

    const bonusResult = await winthor.raw<{ DTFECHAMENTO: Date }[]>(`
      SELECT DTFECHAMENTO
      FROM PCNFENT LEFT JOIN PCBONUSC USING (NUMBONUS)
      WHERE NUMNOTA = ${invoiceNumber}
        AND CODFORNEC = ${schedule.invoices[0].providerCode}
        AND PCNFENT.DTCANCEL IS NULL
    `)

    if (bonusResult.length !== 0) {
      downloadedAt = bonusResult[0].DTFECHAMENTO
    }

    let unlockedAt: Date | undefined

    const osResult = await winthor.raw<{ DTFIMOS: Date }[]>(`
      SELECT DISTINCT PCNFENT.DTENT,
             DTFIMOS,
             PCNFENT.NUMNOTA,
             PCNFENT.VLTOTAL,
             PCNFENT.NUMTRANSENT,
             PCNFENT.CODFILIAL,
             DECODE(PCMOVENDPEND.POSICAO, 'C', 'SIM', 'NAO') OSFINALIZADA,
             PCMOVENDPEND.NUMOS
      FROM PCNFENT,
           PCWMS,
           PCMOVENDPEND,
           PCCONSUM
      WHERE PCNFENT.NUMTRANSENT = PCWMS.NUMTRANSENT (+)
        AND PCWMS.NUMTRANSWMS = PCMOVENDPEND.NUMTRANSWMS (+)
        AND PCNFENT.CODCONT IN (PCCONSUM.CODCONTFOR, PCCONSUM.CODCONTCLI, PCCONSUM.CODCONTDEVCLI, PCCONSUM.CODCONTAJUSTEEST)
        AND (PCNFENT.VLTOTAL > 0 OR NVL(PCNFENT.OBS, 'X') <> 'NF CANCELADA')
        AND PCNFENT.TIPODESCARGA NOT IN ('2', '8')
        AND PCWMS.DTCANCEL IS NULL
        AND PCMOVENDPEND.DATA > (SELECT DTVIRADAWMS FROM PCCONSUM)
        AND PCNFENT.CODFILIAL = 1
        AND PCNFENT.NUMNOTA = ${invoiceNumber}
        AND PCNFENT.CODFORNEC = ${schedule.invoices[0].providerCode}
    `)

    if (osResult.length !== 0) {
      unlockedAt = osResult[0].DTFIMOS
    }

    return createAccompanimentSchedule({
      scheduledAt: schedule.scheduledAt,
      shippingName: schedule.shippingName,
      closedAt: schedule.closedAt || undefined,
      receivedAt: schedule.receivedAt || undefined,
      downloadedAt,
      unlockedAt
    })
  }

  return {
    async find(
      options: IAccompanimentScheduleOptions
    ): Promise<IAccompanimentSchedule | undefined> {
      const { invoiceNumber, invoiceProvider, schedulingAt } = options

      if (!invoiceNumber || !invoiceProvider || !schedulingAt) return undefined

      const provider = await providersModel.findById(invoiceProvider)

      if (!provider) {
        throw new createHttpError.NotFound('O Fornecedor não existe')
      }

      let schedules = await findByProviders(invoiceNumber, [provider])

      if (schedules) {
        return schedules
      }

      const relationatedProviders = await providersModel.findManyByPrincipalId(
        provider.principalCode
      )

      schedules = await findByProviders(invoiceNumber, relationatedProviders)

      if (schedules) {
        return schedules
      }

      return undefined
    }
  }
}
