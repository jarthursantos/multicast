import { IAgendaModel } from '~/models/agenda/IAgendaModel'

export function createFindManyAgendaModule(agendaModel: IAgendaModel) {
  return {
    async execute() {
      const agenda = await agendaModel.findMany()

      return agenda
    }
  }
}
