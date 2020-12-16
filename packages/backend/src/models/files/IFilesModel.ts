import { IFile } from '~/domain/IFile'

export interface IFilesModel {
  save(file: IFile): Promise<void>
}
