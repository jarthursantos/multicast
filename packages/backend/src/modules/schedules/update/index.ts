import { isBefore, subDays } from 'date-fns'
import createHttpError from 'http-errors'
import { assign } from 'lodash'

import { createSchedule } from '~/domain/ISchedule'
import { IUser } from '~/domain/IUser'
import { ISchedulesModel } from '~/models/schedules/ISchedulesModel'

import { IUpdateSchedulesDTO } from './dto'

export function createUpdateSchedulesModule(schedulesModel: ISchedulesModel) {
  return {
    async execute(authUser: IUser, id: string, data: IUpdateSchedulesDTO) {
      const schedule = await schedulesModel.findById(id)

      if (!schedule) {
        throw new createHttpError.NotFound('Agendamento não existe')
      }

      if (schedule.canceledAt) {
        throw new createHttpError.BadRequest('Esse agendamento foi cancelado')
      }

      if (schedule.receivedAt) {
        throw new createHttpError.BadRequest('Esse agendamento foi recebido')
      }

      const updateData = assign(createSchedule(schedule, schedule.id), data)

      if (isBefore(updateData.scheduledAt, subDays(new Date(), 1))) {
        throw new createHttpError.BadRequest('A data solicitada já passou')
      }

      const updatedSchedule = await schedulesModel.update(updateData)
      // await schedulesHistoryRepository.logUpdate(
      //   authUser,
      //   schedule,
      //   updatedSchedule
      // )

      return updatedSchedule
    }
  }
}
