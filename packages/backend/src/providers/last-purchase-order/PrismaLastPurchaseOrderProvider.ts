import { PrismaClient } from '@prisma/client'

import { initialRequestNumber } from '~/configs/preferences'

import { ILastPurchaseOrderProvider } from './ILastPurchaseOrderProvider'

export function createPrismaLastPurchaseOrderProvider(): ILastPurchaseOrderProvider {
  const prisma = new PrismaClient()

  return {
    async find(): Promise<number> {
      const response = await prisma.$queryRaw<{ max: number }[]>(
        'SELECT MAX(number) FROM accompaniments'
      )

      const { max } = response[0]

      return max || initialRequestNumber
    }
  }
}
