import { startOfDay, endOfDay } from 'date-fns'
import createHttpError from 'http-errors'

import { IAgenda } from '~/domain/IAgenda'
import { IBuyer } from '~/domain/IBuyer'
import { IProvider } from '~/domain/IProvider'
import { AgendaSchema, IAgendaSchema } from '~/entities/Agenda'

import { IBuyersModel } from '../buyers/IBuyersModel'
import { IProvidersModel } from '../providers/IProvidersModel'
import { IUsersModel } from '../users/IUsersModel'
import { IAgendaModel } from './IAgendaModel'

export function createMongoAgendaModel(
  buyersModel: IBuyersModel,
  providersModel: IProvidersModel,
  usersModel: IUsersModel
): IAgendaModel {
  async function parseAgenda(allAgenda: IAgendaSchema[]): Promise<IAgenda[]> {
    const result: IAgenda[] = []

    for (let i = 0; i < allAgenda.length; i++) {
      const agenda = allAgenda[i]

      const buyer = await buyersModel.findById(agenda.buyer)

      if (!buyer) {
        throw new createHttpError.NotFound('Comprador não encontrado')
      }

      const createdBy = await usersModel.findById(agenda.createdBy)

      if (!createdBy) {
        throw new createHttpError.NotFound('Usuário não encontrado')
      }

      const providers: IProvider[] = []

      for (let n = 0; n < agenda.providers.length; n++) {
        const providerCode = agenda.providers[n]

        const provider = await providersModel.findById(providerCode)

        if (!provider) {
          throw new createHttpError.NotFound('Fornecedor não encontrado')
        }

        providers.push(provider)
      }

      result.push({
        id: agenda._id,
        buyer,
        createdBy,
        date: {
          from: agenda.from,
          to: agenda.to
        },
        providers
      })
    }

    return result
  }

  return {
    async save(agenda: Omit<IAgenda, 'id'>): Promise<IAgenda> {
      const result = await AgendaSchema.create({
        buyer: agenda.buyer.code,
        createdBy: agenda.createdBy.id,
        from: agenda.date.from,
        to: agenda.date.to,
        providers: agenda.providers.map(provider => provider.code)
      })

      return { ...agenda, id: result.id }
    },

    async findMany(): Promise<IAgenda[]> {
      const allAgenda = await AgendaSchema.find()

      return await parseAgenda(allAgenda)
    },

    async findByBuyer(buyer: IBuyer): Promise<IAgenda[]> {
      const allAgenda = await AgendaSchema.find({
        buyer: buyer.code
      })

      return await parseAgenda(allAgenda)
    },

    async findByDatePerBuyer(date: Date, buyer: IBuyer): Promise<IAgenda[]> {
      const allAgenda = await AgendaSchema.find({
        buyer: buyer.code,
        from: {
          $gte: startOfDay(date),
          $lte: endOfDay(date)
        }
      })

      return await parseAgenda(allAgenda)
    },

    async findByProvider(provider: IProvider): Promise<IAgenda[]> {
      const allAgenda = await AgendaSchema.find({
        providers: provider.code
      })

      return await parseAgenda(allAgenda)
    },

    async update(agenda: IAgenda): Promise<void> {
      await AgendaSchema.update(
        { _id: agenda.id },
        {
          buyer: agenda.buyer.code,
          providers: agenda.providers.map(provider => provider.code),
          date: agenda.date
        }
      )
    },

    async delete(agenda: IAgenda): Promise<void> {
      await AgendaSchema.deleteOne({ _id: agenda.id })
    }
  }
}
