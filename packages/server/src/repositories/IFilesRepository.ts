import { File } from 'entities/File'

export interface IFilesRepository {
  save(file: File): Promise<void>
}
