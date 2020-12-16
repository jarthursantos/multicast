import { PrismaClient } from '@prisma/client'
import { endOfDay, startOfDay } from 'date-fns'
import { omit } from 'lodash'

import {
  createScheduleRequest,
  IScheduleRequest
} from '~/domain/IScheduleRequest'

import { IProvidersModel } from '../providers/IProvidersModel'
import { IScheduleRequestsModel } from './IScheduleRequestsModel'

export function createPrismaScheduleRequestsModel(
  providersModel: IProvidersModel
): IScheduleRequestsModel {
  const prisma = new PrismaClient()

  return {
    async save(data: IScheduleRequest): Promise<void> {
      await prisma.scheduleRequests.create({ data: omit(data, 'provider') })
    },

    async findById(id: string): Promise<IScheduleRequest | undefined> {
      const request = await prisma.scheduleRequests.findOne({
        where: { id }
      })

      if (!request || !request.providerCode || !request.requestedDate) {
        return undefined
      }

      const provider = await providersModel.findById(request.providerCode)

      return createScheduleRequest(
        {
          requestedDate: request.requestedDate,
          providerCode: request.providerCode,
          provider
        },
        request.id
      )
    },

    async update(data: IScheduleRequest): Promise<void> {
      await prisma.scheduleRequests.update({
        where: { id: data.id },
        data: { ...omit(data, 'provider') }
      })
    },

    async findMany(): Promise<IScheduleRequest[]> {
      const requests = await prisma.scheduleRequests.findMany({
        where: { schedule: null }
      })

      const result: IScheduleRequest[] = []

      for (let i = 0; i < requests.length; i++) {
        const request = requests[i]

        if (!request.providerCode || !request.requestedDate) {
          continue
        }

        const provider = await providersModel.findById(request.providerCode)

        result.push(
          createScheduleRequest(
            {
              requestedDate: request.requestedDate,
              providerCode: request.providerCode,
              provider
            },
            request.id
          )
        )
      }

      return result
    },

    async findFromDay(day: Date): Promise<IScheduleRequest[]> {
      const requests = await prisma.scheduleRequests.findMany({
        where: {
          requestedDate: { lte: endOfDay(day), gte: startOfDay(day) }
        }
      })
      const result: IScheduleRequest[] = []

      for (let i = 0; i < requests.length; i++) {
        const request = requests[i]

        if (!request.providerCode || !request.requestedDate) {
          continue
        }

        const provider = await providersModel.findById(request.providerCode)

        result.push(
          createScheduleRequest(
            {
              requestedDate: request.requestedDate,
              providerCode: request.providerCode,
              provider
            },
            request.id
          )
        )
      }

      return result
    },

    async remove(id: string): Promise<void> {
      await prisma.scheduleRequests.delete({
        where: { id }
      })
    },

    async attachToSchedule(id: string, scheduleId: string): Promise<void> {
      await prisma.scheduleRequests.update({
        where: { id },
        data: { schedule: { connect: { id: scheduleId } } }
      })
    }
  }
}
