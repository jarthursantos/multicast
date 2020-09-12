import { PrismaClient } from '@prisma/client'
import { startOfDay, endOfDay } from 'date-fns'
import { ScheduleRequest } from 'entities/ScheduleRequest'
import { omit } from 'lodash'
import { IProviderRepository } from 'repositories/IProviderRepository'
import { IScheduleRequestsRepository } from 'repositories/IScheduleRequestsRepository'

export class PrismaScheduleRequestsRepository
  implements IScheduleRequestsRepository {
  private prisma = new PrismaClient()

  constructor(private providerRepository: IProviderRepository) {}

  async save(data: ScheduleRequest): Promise<void> {
    await this.prisma.scheduleRequests.create({ data: omit(data, 'provider') })
  }

  async findById(id: string): Promise<ScheduleRequest> {
    const request = await this.prisma.scheduleRequests.findOne({
      where: { id }
    })

    if (!request) {
      return undefined
    }

    const provider = await this.providerRepository.findById(
      request.providerCode
    )

    return new ScheduleRequest({ ...request, provider }, request.id)
  }

  async update(data: ScheduleRequest): Promise<void> {
    await this.prisma.scheduleRequests.update({
      where: { id: data.id },
      data: { ...omit(data, 'provider') }
    })
  }

  async findMany(): Promise<ScheduleRequest[]> {
    const requests = await this.prisma.scheduleRequests.findMany({
      where: { schedule: null }
    })

    const result: ScheduleRequest[] = []

    for (let i = 0; i < requests.length; i++) {
      const request = requests[i]

      const provider = await this.providerRepository.findById(
        request.providerCode
      )

      result.push(new ScheduleRequest({ ...request, provider }, request.id))
    }

    return result
  }

  async findFromDay(day: Date): Promise<ScheduleRequest[]> {
    const requests = await this.prisma.scheduleRequests.findMany({
      where: {
        requestedDate: { lte: endOfDay(day), gte: startOfDay(day) }
      }
    })
    const result: ScheduleRequest[] = []

    for (let i = 0; i < requests.length; i++) {
      const request = requests[i]

      const provider = await this.providerRepository.findById(
        request.providerCode
      )

      result.push(new ScheduleRequest({ ...request, provider }, request.id))
    }

    return result
  }

  async remove(id: string): Promise<void> {
    await this.prisma.scheduleRequests.delete({
      where: { id }
    })
  }

  async attachToSchedule(id: string, scheduleId: string): Promise<void> {
    await this.prisma.scheduleRequests.update({
      where: { id },
      data: { schedule: { connect: { id: scheduleId } } }
    })
  }
}
