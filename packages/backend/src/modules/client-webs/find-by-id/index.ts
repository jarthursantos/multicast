import { IClientWebsModel } from '~/models/client-webs/IClientWebsModel'

export function createFindClientWebByIdModule(
  clientWebsModel: IClientWebsModel
) {
  return {
    async execute(code: number) {
      const webs = await clientWebsModel.findById(code)

      return webs
    }
  }
}
