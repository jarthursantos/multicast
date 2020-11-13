import { IDepartmentRepository } from 'repositories/IDepartmentRepository'

export class FindDepartmentsUseCase {
  constructor(private departmentRepository: IDepartmentRepository) {}

  async execute() {
    const departments = await this.departmentRepository.findMany()

    return departments
  }
}
