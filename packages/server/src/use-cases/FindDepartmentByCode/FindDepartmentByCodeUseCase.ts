import { IDepartmentRepository } from 'repositories/IDepartmentRepository'

export class FindDepartmentByCodeUseCase {
  constructor(private departmentRepository: IDepartmentRepository) {}

  async execute(code: number) {
    const department = await this.departmentRepository.findById(code)

    return department
  }
}
