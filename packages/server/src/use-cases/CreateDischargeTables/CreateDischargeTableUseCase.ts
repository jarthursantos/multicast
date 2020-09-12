import { DischargeTable } from 'entities/DischargeTable'
import { IDischargeTablesRepository } from 'repositories/IDischargeTablesRepository'

import { CreateDischargeTableRequestDTO } from './CreateDischargeTableDTO'

export class CreateDischargeTableUseCase {
  constructor(private dischargeTableRepository: IDischargeTablesRepository) {}

  async execute(data: CreateDischargeTableRequestDTO) {
    const dischargeTable = new DischargeTable(data)

    await this.dischargeTableRepository.save(dischargeTable)

    return dischargeTable
  }
}
