import { Department } from 'entities/Department'

export interface IDepartmentRepository {
  findById(id: number): Promise<Department | undefined>
  findMany(): Promise<Department[]>
}
