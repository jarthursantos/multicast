import { IEmployee } from '~/domain/IEmployee'

export interface IEmployeesModel {
  search(param: string): Promise<IEmployee[]>
}
