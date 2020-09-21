import { IEmployeeRepository } from 'repositories/IEmployeeRepository'

export class FindEmployeesUseCase {
  constructor(private employeesRepository: IEmployeeRepository) {}

  async execute(name: string) {
    const employees = await this.employeesRepository.search(
      name.trim().toUpperCase()
    )

    return employees
  }
}
