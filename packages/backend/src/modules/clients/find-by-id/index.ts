import { IClientsModel } from '~/models/clients/IClientsModel'

export function createFindClientByIdModule(clientsModel: IClientsModel) {
  return {
    async execute(code: number) {
      const client = await clientsModel.findById(code)

      return client
    }
  }
}
