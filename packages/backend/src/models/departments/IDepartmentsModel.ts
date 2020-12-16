import { IDepartment } from '~/domain/IDepartment'

export interface IDepartmentsModel {
  findById(id: number): Promise<IDepartment | undefined>
  findMany(): Promise<IDepartment[]>
}
