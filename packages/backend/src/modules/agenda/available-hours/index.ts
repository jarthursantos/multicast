import {
  addHours,
  addMinutes,
  startOfDay,
  isAfter,
  isBefore,
  isEqual
} from 'date-fns'
import createHttpError from 'http-errors'

import { IAgendaModel } from '~/models/agenda/IAgendaModel'
import { IBuyersModel } from '~/models/buyers/IBuyersModel'
import { normalizeDate } from '~/utilities/normalizations'

import { IAvailableHoursData } from './dto'

interface HourPossibilitie {
  start: Date
  end: Date
}

function generateAllHoursPossibilities(
  date: Date,
  duration: number
): HourPossibilitie[] {
  const possibilities: HourPossibilitie[] = []

  let start = addHours(startOfDay(date), 7)
  const endPoint = addHours(start, 11)

  while (!isAfter(start, endPoint)) {
    const end = addMinutes(start, duration)

    possibilities.push({ start, end })

    if (isEqual(end, endPoint)) {
      break
    }

    start = addMinutes(start, 30)
  }

  return possibilities
}

export function createAvailableHoursModule(
  agendaModel: IAgendaModel,
  buyersModel: IBuyersModel
) {
  return {
    async execute(buyerCode: number, data: IAvailableHoursData) {
      const buyer = await buyersModel.findById(buyerCode)

      if (!buyer) {
        throw new createHttpError.NotFound('Comprador não encontrado')
      }

      const date = normalizeDate(data.date)
      const duration = data.providerCount * 30

      const allPossibilities = generateAllHoursPossibilities(date, duration)
      const agendas = await agendaModel.findByDatePerBuyer(date, buyer)

      const availableHours = allPossibilities.filter(({ start, end }) => {
        for (let i = 0; i < agendas.length; i++) {
          const {
            date: { from, to }
          } = agendas[i]

          if (
            (isAfter(start, from) && isBefore(start, to)) ||
            isEqual(start, from)
          ) {
            return false
          }

          if ((isAfter(end, from) && isBefore(end, to)) || isEqual(end, to)) {
            return false
          }

          if (
            (isBefore(start, from) || isEqual(start, from)) &&
            (isAfter(end, to) || isEqual(end, to))
          ) {
            return false
          }
        }

        return true
      })

      return availableHours
    }
  }
}
