import { DischargeTable } from 'entities/DischargeTable'

export interface IDischargeTablesRepository {
  save(dischargeTable: DischargeTable): Promise<void>
  findLatest(): Promise<DischargeTable | undefined>
}
