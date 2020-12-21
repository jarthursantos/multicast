import { PrismaClient } from '@prisma/client'

import { createDischargeTable, IDischargeTable } from '~/domain/IDischargeTable'

import { IDisachargeTablesModel } from './IDisachargeTablesModel'

export function createPrismaDischargeTablesModel(): IDisachargeTablesModel {
  const prisma = new PrismaClient()

  return {
    async save(dischargeTable: IDischargeTable): Promise<void> {
      await prisma.dischargeTable.create({
        data: dischargeTable
      })

      const nonConflictedSchedules = await prisma.schedules.findMany({
        where: { receivedAt: null }
      })

      for (let i = 0; i < nonConflictedSchedules.length; i++) {
        const schedule = nonConflictedSchedules[i]

        await prisma.schedules.update({
          where: { id: schedule.id },
          data: { dischargeTable: { connect: { id: dischargeTable.id } } }
        })
      }
    },

    async findLatest(): Promise<IDischargeTable | undefined> {
      const discharges = await prisma.dischargeTable.findMany({
        orderBy: { createdAt: 'desc' },
        take: 1
      })

      if (discharges.length === 0) {
        return undefined
      }

      const discharge = discharges[0]

      return createDischargeTable(discharge, discharge.id)
    }
  }
}
