import { createFile } from '~/domain/IFile'
import { IFilesModel } from '~/models/files/IFilesModel'

import { ICreateFilesDTO } from './dto'

export function createCreateFilesModule(filesModel: IFilesModel) {
  return {
    async execute(data: ICreateFilesDTO) {
      const file = createFile(data)

      await filesModel.save(file)

      return file
    }
  }
}
