import { IClientWebsModel } from '~/models/client-webs/IClientWebsModel'

export function createFindAllClientWebsModule(
  clientWebsModel: IClientWebsModel
) {
  return {
    async execute() {
      const webs = await clientWebsModel.findMany()

      return webs
    }
  }
}
