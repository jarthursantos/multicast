import { Employee } from 'entities/Employee'

export interface IEmployeeRepository {
  search(param: string): Promise<Employee[]>
}
