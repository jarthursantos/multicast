import { PrismaClient } from '@prisma/client'
import { initialRequestNumber } from 'configs/preferences'
import { ILastPurchaseOrderProvider } from 'providers/ILastPurchaseOrderProvider'

export class PrismaLastPurchaseOrderProvider
  implements ILastPurchaseOrderProvider {
  private prisma = new PrismaClient()

  async find(): Promise<number> {
    const response = await this.prisma.$queryRaw<{ max: number }[]>(
      'SELECT MAX(number) FROM accompaniments'
    )

    const { max } = response[0]

    return max || initialRequestNumber
  }
}
