import { PrismaFilesRepository } from 'repositories/implementations/PrismaFilesRepository'

import { CreateFilesController } from './CreateFilesController'
import { CreateFilesUseCase } from './CreateFilesUseCase'

const prismaFilesRepository = new PrismaFilesRepository()

const createFilesUseCase = new CreateFilesUseCase(prismaFilesRepository)

const createFilesController = new CreateFilesController(createFilesUseCase)

export { createFilesUseCase, createFilesController }
