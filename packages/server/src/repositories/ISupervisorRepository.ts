import { Supervisor } from 'entities/Supervisor'

export interface ISupervisorRepository {
  findById(id: number): Promise<Supervisor | undefined>
  findMany(): Promise<Supervisor[]>
}
