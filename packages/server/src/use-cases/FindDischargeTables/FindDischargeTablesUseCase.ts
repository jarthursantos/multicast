import { IDischargeTablesRepository } from 'repositories/IDischargeTablesRepository'

export class FindDischargeTablesUseCase {
  constructor(private dischargeTablesRepository: IDischargeTablesRepository) {}

  async execute() {
    const dischargeTable = await this.dischargeTablesRepository.findLatest()

    if (!dischargeTable) {
      throw Error('Nenhuma tabela de descarrego cadastrada')
    }

    return dischargeTable
  }
}
