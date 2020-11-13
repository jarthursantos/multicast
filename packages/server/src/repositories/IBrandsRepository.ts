import { Brand } from 'entities/Brand'

export interface IBrandRepository {
  findById(id: number): Promise<Brand | undefined>
  findMany(): Promise<Brand[]>
}
