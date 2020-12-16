import { IClientsModel } from '~/models/clients/IClientsModel'

export function createFindAllClientsModule(clientsModel: IClientsModel) {
  return {
    async execute() {
      const clients = await clientsModel.findMany()

      return clients
    }
  }
}
