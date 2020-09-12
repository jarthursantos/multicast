import { File } from 'entities/File'
import { IFilesRepository } from 'repositories/IFilesRepository'

import { CreateFilesRequestDTO } from './CreateFilesDTO'

export class CreateFilesUseCase {
  constructor(private filesRepository: IFilesRepository) {}

  async execute(data: CreateFilesRequestDTO) {
    const file = new File(data)

    await this.filesRepository.save(file)

    return file
  }
}
