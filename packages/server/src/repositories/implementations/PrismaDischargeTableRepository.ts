import { PrismaClient } from '@prisma/client'
import { DischargeTable } from 'entities/DischargeTable'
import { IDischargeTablesRepository } from 'repositories/IDischargeTablesRepository'

export class PrismaDischargeTableRepository
  implements IDischargeTablesRepository {
  private prisma = new PrismaClient()

  async save(dischargeTable: DischargeTable): Promise<void> {
    await this.prisma.dischargeTable.create({
      data: dischargeTable
    })

    const nonConflictedSchedules = await this.prisma.schedules.findMany({
      where: { receivedAt: null }
    })

    for (let i = 0; i < nonConflictedSchedules.length; i++) {
      const schedule = nonConflictedSchedules[i]

      await this.prisma.schedules.update({
        where: { id: schedule.id },
        data: { dischargeTable: { connect: { id: dischargeTable.id } } }
      })
    }
  }

  async findLatest(): Promise<DischargeTable> {
    const discharges = await this.prisma.dischargeTable.findMany({
      orderBy: { createdAt: 'desc' },
      take: 1
    })

    if (discharges.length === 0) {
      return undefined
    }

    const discharge = discharges[0]

    return new DischargeTable(discharge, discharge.id)
  }
}
