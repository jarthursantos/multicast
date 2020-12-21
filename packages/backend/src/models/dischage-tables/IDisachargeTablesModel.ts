import { IDischargeTable } from '~/domain/IDischargeTable'

export interface IDisachargeTablesModel {
  save(dischargeTable: IDischargeTable): Promise<void>
  findLatest(): Promise<IDischargeTable | undefined>
}
