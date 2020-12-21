import { PrismaClient } from '@prisma/client'
import { assign } from 'lodash'

import { CriticalLevel } from '~/domain/CriticalLevel'
import { createAccompaniment, IAccompaniment } from '~/domain/IAccompaniment'
import { IRenewAccompanimentResult } from '~/domain/IRenewAccompanimentResult'

import { IAccompanimentsModel } from '../accompaniments/IAccompanimentsModel'
import { IRenewAccompanimentModel } from './IRenewAccompanimentModel'

export function createPrismaRenewAccompanimentsModel(
  accompanimentsModel: IAccompanimentsModel
): IRenewAccompanimentModel {
  const prisma = new PrismaClient()

  return {
    async renew(
      accompaniment: IAccompaniment
    ): Promise<IRenewAccompanimentResult> {
      const { purchaseOrder } = accompaniment

      const renewedData = createAccompaniment({
        ...purchaseOrder,
        purchaseOrder,
        annotations: [],
        isOutstanding: true,
        criticalLevel: CriticalLevel.NORMAL,
        delay: accompaniment.delay
      })

      await accompanimentsModel.save(renewedData)

      const updateRenewedData = assign(renewedData, {
        sendedAt: accompaniment.sendedAt,
        reviewedAt: accompaniment.reviewedAt,
        releasedAt: accompaniment.releasedAt
      })

      const renewedAccompaniment = await accompanimentsModel.update(
        updateRenewedData
      )

      renewedAccompaniment.isOutstanding = true

      accompaniment.renewedAt = new Date()

      await prisma.accompaniments.update({
        where: { id: accompaniment.id },
        data: {
          renewedTo: { connect: { id: renewedAccompaniment.id } },
          renewedAt: accompaniment.renewedAt
        }
      })

      await prisma.accompaniments.update({
        where: { id: renewedAccompaniment.id },
        data: { renewedFrom: { connect: { id: accompaniment.id } } }
      })

      return { accompaniment, renewedAccompaniment }
    }
  }
}
