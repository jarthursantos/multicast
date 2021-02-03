import { isBefore, isAfter, isEqual } from 'date-fns'
import createHttpError from 'http-errors'

import { IProvider } from '~/domain/IProvider'
import { IUser } from '~/domain/IUser'
import { IAgendaModel } from '~/models/agenda/IAgendaModel'
import { IBuyersModel } from '~/models/buyers/IBuyersModel'
import { IProvidersModel } from '~/models/providers/IProvidersModel'
import { normalizeDate } from '~/utilities/normalizations'

import { ICreateAgendaDTO } from './dto'

export function createCreateAgendaModule(
  agendaModel: IAgendaModel,
  buyersModel: IBuyersModel,
  providersModel: IProvidersModel
) {
  return {
    async execute(authUser: IUser, data: ICreateAgendaDTO) {
      const {
        agendaFrom,
        agendaTo,
        buyer: buyerCode,
        providers: providerCodes
      } = data

      const normalizedFrom = normalizeDate(agendaFrom)
      const normalizedTo = normalizeDate(agendaTo)

      if (isBefore(normalizedTo, normalizedFrom)) {
        throw new createHttpError.BadRequest(
          'O fim do agendamento é anterior ao inicio'
        )
      }

      const buyer = await buyersModel.findById(buyerCode)

      if (!buyer) {
        throw new createHttpError.NotFound('Comprador não encontrado')
      }

      const agendas = await agendaModel.findByDatePerBuyer(
        normalizedFrom,
        buyer
      )

      agendas.forEach(({ date }) => {
        const { from, to } = date

        if (
          (isAfter(normalizedFrom, from) && isBefore(normalizedFrom, to)) ||
          isEqual(normalizedFrom, from)
        ) {
          throw new createHttpError.BadRequest(
            'O inicio do agendamento conflita com um agendamento já existente'
          )
        }

        if (
          (isAfter(normalizedTo, from) && isBefore(normalizedTo, to)) ||
          isEqual(normalizedTo, to)
        ) {
          throw new createHttpError.BadRequest(
            'O fim do agendamento conflita com um agendamento já existente'
          )
        }

        if (
          (isBefore(normalizedFrom, from) || isEqual(normalizedFrom, from)) &&
          (isAfter(normalizedTo, to) || isEqual(normalizedTo, to))
        ) {
          throw new createHttpError.BadRequest(
            'Já existe um agendamento entre esses horários'
          )
        }
      })

      const providers: IProvider[] = []
      const uniqueProviderCodes: number[] = []

      new Set(providerCodes).forEach(code => uniqueProviderCodes.push(code))

      for (let i = 0; i < uniqueProviderCodes.length; i++) {
        const providerCode = uniqueProviderCodes[i]

        const provider = await providersModel.findById(providerCode)

        if (!provider) {
          throw new createHttpError.NotFound('Fornecedor não encontrado')
        }

        providers.push(provider)
      }

      const agenda = await agendaModel.save({
        buyer,
        providers,
        createdBy: authUser,
        date: {
          from: normalizedFrom,
          to: normalizedTo
        }
      })

      return agenda
    }
  }
}
